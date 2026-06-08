import db from "../config/db_connect.js";
import { compressImg } from "../utils/sharphandler.js";
import { removeImg } from "../utils/removeImg.js";

export const addGallery = async (req, res, next) => {
  let images = [];
  try {
    const { title, gallery_date, location, branch_id } = req.body;
    images = req.files; // array of files

    if (!title || !gallery_date || !location || !branch_id || !images) {
      for (const i of images) {
        removeImg(i.path);
      }

      return res.status(400).json({
        message: "All fields including at least one image are required",
      });
    }

    // Check if branch exists
    const [branch] = await db.execute(
      "SELECT * FROM branch WHERE branch_id = ?",
      [branch_id],
    );
    if (branch.length === 0) {
      for (const i of images) {
        removeImg(i.path);
      }

      return res.status(404).json({ message: "Branch not found" });
    }

    // Compress and save all images
    const imagePaths = [];
    for (const i of images) {
      const outputPath = `uploads/gallery/compressed-${i.filename}`; // i is a variable
      await compressImg(i.path, outputPath);
      imagePaths.push(outputPath);
    }

    // it is use for separating images path by comma.
    const imageStiring = imagePaths.join(",");
    // Save gallery info in DB
    // Option 1: save multiple images as JSON in one column

    await db.execute(
      `INSERT INTO gallery (title, gallery_date, location, branch_id, image)
       VALUES (?, ?, ?, ?,  ?)`,
      [title, gallery_date, location, branch_id, imageStiring],
    );

    res.status(201).json({
      message: "photos are  added successfully",
      images: imagePaths,
    });
  } catch (error) {
    for (const i of images) {
      removeImg(i.path);
    }

    next(error);
  }
};

// Get all gallery entries
export const getAllGallery = async (req, res, next) => {
  try {
    const [galleries] = await db.execute(
      `SELECT g.*, b.branch_name 
       FROM gallery g 
       LEFT JOIN branch b ON g.branch_id = b.branch_id 
       ORDER BY g.created_at DESC`
    );

    res.status(200).json({
      success: true,
      message: "All galleries fetched successfully",
      count: galleries.length,
      data: galleries,
    });
  } catch (error) {
    next(error);
  }
};

// Get gallery by manager ID
export const getGalleryByBranch = async (req, res, next) => {
  try {
    const { branch_id } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    if (!branch_id) {
      return res.status(400).json({ message: "Please provide branch ID" });
    }

    // Get total count
    const [countResult] = await db.query(
      "SELECT COUNT(*) AS total FROM gallery WHERE branch_id = ?",
      [branch_id]
    );
    const total = countResult[0].total;

    // Get paginated results with branch name
    const [result] = await db.execute(
      `SELECT g.*, b.branch_name 
       FROM gallery g 
       LEFT JOIN branch b ON g.branch_id = b.branch_id 
       WHERE g.branch_id = ? 
       ORDER BY g.created_at DESC
       LIMIT ? OFFSET ?`,
      [branch_id, limit, offset]
    );

    res.status(200).json({
      success: true,
      message: "Branch galleries fetched successfully",
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      count: result.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// Get gallery by branch ID
export const gerBranchGallery = async (req, res, next) => {
  try {
    const { branch_id } = req.user.branch_id;

    if (!branch_id) {
      return res.status(400).json({ message: "Please provide branch ID" });
    }

    const [result] = await db.execute(
      "SELECT * FROM gallery WHERE branch_id = ? ORDER BY created_at DESC",
      [branch_id],
    );

    res.status(200).json({
      message: "Branch galleries fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Update Gallery
export const updateGallery = async (req, res, next) => {
  let images = [];
  try {
    const { id } = req.params;
    const { title, gallery_date, location, branch_id } = req.body;
    images = req.files;

    if (!id) {
      return res.status(400).json({ message: "Please provide gallery ID" });
    }

    const [existing] = await db.execute(
      "SELECT * FROM gallery WHERE gallery_id = ?",
      [id],
    );

    if (existing.length === 0) {
      if (images && images.length > 0) {
        for (const i of images) {
          removeImg(i.path);
        }
      }
      return res.status(404).json({ message: "Gallery not found" });
    }

    const oldGallery = existing[0];
    let imagePath = oldGallery.image;

    // If new images are uploaded
    if (images && images.length > 0) {
      const imagePaths = [];
      for (const i of images) {
        const outputPath = `uploads/gallery/compressed-${i.filename}`;
        await compressImg(i.path, outputPath);
        imagePaths.push(outputPath);
      }
      imagePath = imagePaths.join(",");

      // Remove old images
      if (oldGallery.image) {
        const oldImages = oldGallery.image.split(",");
        for (const img of oldImages) {
          removeImg(img);
        }
      }
    }

    await db.execute(
      "UPDATE gallery SET title=?, gallery_date=?, location=?, branch_id=?, image=? WHERE gallery_id=?",
      [
        title || oldGallery.title,
        gallery_date || oldGallery.gallery_date,
        location || oldGallery.location,
        branch_id || oldGallery.branch_id,
        imagePath,
        id,
      ],
    );

    res.status(200).json({ message: "Gallery updated successfully" });
  } catch (error) {
    if (images && images.length > 0) {
      for (const i of images) {
        removeImg(i.path);
      }
    }
    next(error);
  }
};

// Delete Gallery
export const deleteGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [existing] = await db.execute(
      "SELECT * FROM gallery WHERE gallery_id = ?",
      [id],
    );
    if (existing.length === 0)
      return res.status(404).json({ message: "Gallery entry not found" });
    if (req.user.role === "manager") {
      req.params.branch_id = existing[0].branch_id;
      if (req.params.branch_id !== req.user.branch_id) {
        return res.status(403).json({
          message: "you can only access own branch",
        });
      }
    }

    const gallery = existing[0];

    // Remove image
    if (gallery.image) removeImg(gallery.image);

    // Delete DB record
    await db.execute("DELETE FROM gallery WHERE gallery_id = ?", [id]);

    res.status(200).json({ message: "Gallery deleted successfully" });
  } catch (error) {
    next(error);
  }
};
