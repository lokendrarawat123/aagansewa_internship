import db from "../config/db_connect.js";
import { compressImg } from "../utils/sharphandler.js";
import { removeImg } from "../utils/removeImg.js";

// Add Gallery
export const addGallery = async (req, res, next) => {
  try {
    const { title, gallery_date, location, branch_id, staff_id } = req.body;
    const file = req.files;

    if (
      !title ||
      !gallery_date ||
      !location ||
      !branch_id ||
      !staff_id ||
      !file
    ) {
      return res
        .status(400)
        .json({ message: "All fields including image are required" });
    }

    // Check if branch exists
    const [branch] = await db.execute(
      "SELECT * FROM branch WHERE branch_id = ?",
      [branch_id]
    );
    if (branch.length === 0)
      return res.status(404).json({ message: "Branch not found" });

    // Check if staff exists
    const [staff] = await db.execute("SELECT * FROM staff WHERE staff_id = ?", [
      staff_id,
    ]);
    if (staff.length === 0)
      return res.status(404).json({ message: "Staff not found" });

    // Compress and save image
    const outputPath = `uploads/gallery/${file.filename}`;
    await compressImg(file.path, outputPath);

    // Insert into DB
    await db.execute(
      "INSERT INTO gallery (title, gallery_date, location, branch_id, staff_id, image) VALUES (?, ?, ?, ?, ?, ?)",
      [title, gallery_date, location, branch_id, staff_id, outputPath]
    );

    res.status(201).json({ message: "Gallery added successfully" });
  } catch (error) {
    if (req.file) removeImg(req.file.path);
    next(error);
  }
};

// Get all gallery entries
export const getGallery = async (req, res, next) => {
  try {
    const [galleries] = await db.execute(
      "SELECT * FROM gallery ORDER BY created_at DESC"
    );

    if (galleries.length === 0)
      return res.status(404).json({ message: "No gallery entries found" });

    res.status(200).json({
      message: "Gallery fetched successfully",
      galleries,
    });
  } catch (error) {
    next(error);
  }
};

// Update Gallery
export const updateGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, gallery_date, location, branch_id, staff_id } = req.body;
    const file = req.files;

    const [existing] = await db.execute(
      "SELECT * FROM gallery WHERE gallery_id = ?",
      [id]
    );
    if (existing.length === 0)
      return res.status(404).json({ message: "Gallery entry not found" });

    const oldGallery = existing[0];
    let imagePath = oldGallery.image;

    // If new image is uploaded
    if (file) {
      imagePath = `uploads/gallery/${file.filename}`;
      await compressImg(file.path, imagePath);
      if (oldGallery.image) removeImg(oldGallery.image);
    }

    await db.execute(
      "UPDATE gallery SET title = ?, gallery_date = ?, location = ?, branch_id = ?, staff_id = ?, image = ? WHERE gallery_id = ?",
      [
        title || oldGallery.title,
        gallery_date || oldGallery.gallery_date,
        location || oldGallery.location,
        branch_id || oldGallery.branch_id,
        staff_id || oldGallery.staff_id,
        imagePath,
        id,
      ]
    );

    res.status(200).json({ message: "Gallery updated successfully" });
  } catch (error) {
    if (req.files) removeImg(req.files.path);
    next(error);
  }
};

// Delete Gallery
export const deleteGallery = async (req, res, next) => {
  try {
    const { id } = req.params;

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
