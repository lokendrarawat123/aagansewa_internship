import db from "../config/db_connect.js";
import { compressImg } from "../utils/sharphandler.js";
import { removeImg } from "../utils/removeImg.js";

export const addGallery = async (req, res, next) => {
  let images = [];
  try {
    const { title, gallery_date, location, branch_id } = req.body;
    images = req.files; // array of files
    const { role, email } = req.user;
    console.log(images);
    console.log(req.files);

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
      [branch_id]
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
      const outputPath = `uploads/gallery/${i.filename}`; // i is a variable
      await compressImg(i.path, outputPath);
      imagePaths.push(outputPath);
    }

    // it is use for separating images path by comma.
    const imageStiring = imagePaths.join(",");
    // Save gallery info in DB
    // Option 1: save multiple images as JSON in one column
    if (role === "manager") {
      const [id] = await db.execute(
        "select  branch_id from users where email=? ",
        [email]
      );

      const userBranch_id = id[0].branch_id;

      if (branch_id != userBranch_id) {
        return res.status(403).json({
          message: "!!!!!!!!!!!!!!! Access denied ",
        });
      }
    }
    await db.execute(
      `INSERT INTO gallery (title, gallery_date, location, branch_id, image)
       VALUES (?, ?, ?, ?,  ?)`,
      [title, gallery_date, location, branch_id, imageStiring]
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
export const getGallery = async (req, res, next) => {
  try {
    const { role, email } = req.user;
    if (role === "manager") {
      const [id] = await db.execute(
        "select  branch_id from users where email=? ",
        [email]
      );
      const userBranch_id = id[0].branch_id;
      const [galleries] = await db.execute(
        "SELECT * FROM gallery WHERE branch_id=? ORDER BY created_at DESC",
        [userBranch_id]
      );
      res.status(200).json({
        message: "Gallery fetched successfully",
        photots: galleries,
      });
    }
    if (role === "adnin") {
      const [galleries] = await db.execute(
        "SELECT * FROM gallery ORDER BY created_at DESC"
      );

      if (galleries.length === 0)
        return res.status(404).json({ message: "No gallery entries found" });

      res.status(200).json({
        message: "Gallery fetched successfully",
        photots: galleries,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Update Gallery
// export const updateGallery = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { title, gallery_date, location, branch_id, staff_id } = req.body;
//     const file = req.files;

//     const [existing] = await db.execute(
//       "SELECT * FROM gallery WHERE gallery_id = ?",
//       [id]
//     );
//     if (existing.length === 0)
//       return res.status(404).json({ message: "Gallery entry not found" });

//     const oldGallery = existing[0];
//     let imagePath = oldGallery.image;

//     // If new image is uploaded
//     if (file) {
//       imagePath = `uploads/gallery/${file.filename}`;
//       await compressImg(file.path, imagePath);
//       if (oldGallery.image) removeImg(oldGallery.image);
//     }

//     await db.execute(
//       "UPDATE gallery SET title = ?, gallery_date = ?, location = ?, branch_id = ?, staff_id = ?, image = ? WHERE gallery_id = ?",
//       [
//         title || oldGallery.title,
//         gallery_date || oldGallery.gallery_date,
//         location || oldGallery.location,
//         branch_id || oldGallery.branch_id,
//         staff_id || oldGallery.staff_id,
//         imagePath,
//         id,
//       ]
//     );

//     res.status(200).json({ message: "Gallery updated successfully" });
//   } catch (error) {
//     if (req.files) removeImg(req.files.path);
//     next(error);
//   }
// };

// Delete Gallery
export const deleteGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, email } = req.user;
    if (role === "manager") {
      const [id] = await db.execute(
        "select  branch_id from users where email=? ",
        [email]
      );
      const userBranch_id = id[0].branch_id;

      if (id === userBranch_id) {
        return res.status(403).json({
          message: "!!!!!!!!!!!!!!! Access denied ",
        });
      }
    }
    const [existing] = await db.execute(
      "SELECT * FROM gallery WHERE gallery_id = ?",
      [id]
    );

    if (existing.length === 0)
      return res.status(404).json({ message: "Gallery entry not found" });

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
