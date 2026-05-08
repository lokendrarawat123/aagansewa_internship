import db from "../config/db_connect.js";
import { removeImg } from "../utils/removeImg.js";
import { compressImg } from "../utils/sharphandler.js";

// Add Service
import { generateUniqueSlug } from "../utils/slugify.js";

export const addService = async (req, res, next) => {
  try {
    const { service_name, description, branch_id } = req.body;

    if (!req.file || !service_name || !branch_id) {
      if (req.file) removeImg(req.file.path);
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    // ✅ reusable slug call
    const slug = await generateUniqueSlug(db, "services", "slug", service_name);

    const [exist] = await db.execute(
      "SELECT service_name FROM services WHERE service_name = ?",
      [service_name],
    );

    if (exist.length > 0) {
      removeImg(req.file.path);
      return res
        .status(409)
        .json({ success: false, message: "Service already exists" });
    }

    let imagePath = `uploads/services/school-${req.file.filename}`;
    await compressImg(req.file.path, imagePath);

    await db.execute(
      "INSERT INTO services (service_name,slug ,service_image, branch_id, description) VALUES (?,?,?,?,?)",
      [service_name, slug, imagePath, branch_id, description || null],
    );

    res.status(201).json({
      success: true,
      message: "Service added successfully",
      slug,
    });
  } catch (error) {
    if (req.file) removeImg(req.file.path);
    next(error);
  }
};

// Get All (Public with Search/Filter)
// export const publicGetServices = async (req, res, next) => {
//   try {
//     const { branch_id } = req.query;
//     let query = "SELECT * FROM services";
//     let params = [];

//     if (branch_id) {
//       query += " WHERE branch_id = ?";
//       params = [branch_id];
//     }
//     query += " ORDER BY created_at DESC";

//     const [rows] = await db.execute(query, params);
//     res.status(200).json({ success: true, data: rows });
//   } catch (error) {
//     next(error);
//   }
// };

// Get Single by ID
export const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute(
      "SELECT * FROM services WHERE service_id = ?",
      [id],
    );
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
};
//getServicesbySlug
// controllers/serviceController.js

export const getServicesBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const [rows] = await db.execute("SELECT * FROM services WHERE slug = ?", [
      slug,
    ]);

    // ❗ if not found
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0], // single service
    });
  } catch (error) {
    next(error);
  }
};

// Update Service
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { service_name, description } = req.body;
    const [exist] = await db.execute(
      "SELECT * FROM services WHERE service_id = ?",
      [id],
    );

    if (exist.length === 0)
      return res.status(404).json({ success: false, message: "Not found" });

    let imagePath = exist[0].service_image;
    if (req.file) {
      const newPath = `uploads/services/school-${req.file.filename}`;
      await compressImg(req.file.path, newPath);
      if (imagePath) removeImg(imagePath);
      imagePath = newPath;
    }

    await db.execute(
      "UPDATE services SET service_name=?, service_image=?, description=? WHERE service_id=?",
      [
        service_name || exist[0].service_name,
        imagePath,
        description || exist[0].description,
        id,
      ],
    );

    res.status(200).json({ success: true, message: "Updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete Service
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [exist] = await db.execute(
      "SELECT service_image FROM services WHERE service_id = ?",
      [id],
    );
    if (exist.length === 0)
      return res.status(404).json({ success: false, message: "Not found" });

    if (exist[0].service_image) removeImg(exist[0].service_image);
    await db.execute("DELETE FROM services WHERE service_id = ?", [id]);

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get By Branch
export const getServicesByBranchId = async (req, res, next) => {
  try {
    const { branchId } = req.params;

    // ✅ validation
    if (!branchId) {
      return res.status(400).json({
        success: false,
        message: "Branch ID is required",
      });
    }

    const [rows] = await db.execute(
      "SELECT * FROM services WHERE branch_id = ?",
      [branchId],
    );

    // ✅ यदि data छैन भने पनि handle गर
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No services found for this branch",
      });
    }

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

// Admin List (Commented logic simplified)
export const getServices = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM services ORDER BY created_at DESC",
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};
// api for public services
export const publicGetServices = async (req, res, next) => {
  try {
    const { province_id, district_id, branch_id } = req.query;
    // console.log(req.query);
    let query = "";
    let params = [];
    if (province_id && !district_id && !branch_id) {
      query = "select * from district where province_id=?";
      params = [province_id];
    } else if (province_id && district_id && !branch_id) {
      query = "select * from branch where district_id =?";
      params = [district_id];
    } else if (province_id && district_id && branch_id) {
      query = "select * from services where branch_id =?";
      params = [branch_id];
    } else {
      query = "select * from services order by created_at desc";
    }
    const [result] = await db.execute(query, params);
    return res.status(200).json({
      message: "service displayed succesfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// with branch and service
export const getAllServicesWithBranch = async (req, res, next) => {
  try {
    /**
     * SELECT s.*: सेवा (Service) टेबलका सबै कोलमहरू
     * b.branch_name: ब्रान्चको नाम
     * b.branch_id: ब्रान्चको ID (यसलाई b_id भनिएको छ ताकि कन्फ्युजन नहोस्)
     */
    const query = `
      SELECT 
        s.*, 
        b.branch_name, 
        b.branch_id AS b_id
      FROM services s
      LEFT JOIN branch b ON s.branch_id = b.branch_id
      ORDER BY s.created_at DESC
    `;

    const [rows] = await db.execute(query);

    // यदि डेटा छैन भने
    if (rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No services available",
        data: [],
      });
    }

    // सफल रेस्पोन्स
    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching services with branch:", error);
    next(error); // Error handling middleware मा पठाउने
  }
};
export const vision = async (req, res, next) => {
  try {
    const { province_id, district_id, branch_id } = req.query;
    // console.log(req.query);
    let query = "";
    let params = [];
    if (province_id && !district_id && !branch_id) {
      query = "select * from district where province_id=?";
      params = [province_id];
    } else if (province_id && district_id && !branch_id) {
      query = "select * from branch where district_id =?";
      params = [district_id];
    } else if (province_id && district_id && branch_id) {
      query = "select * from services where branch_id =?";
      params = [branch_id];
    } else {
      query = "select * from services order by created_at desc";
    }
    const [result] = await db.execute(query, params);
    return res.status(200).json({
      message: "service displayed succesfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};