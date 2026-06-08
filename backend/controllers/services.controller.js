import db from "../config/db_connect.js";
import { removeImg } from "../utils/removeImg.js";
import { compressImg } from "../utils/sharphandler.js";
import { generateUniqueSlug } from "../utils/slugify.js";
// ================= CREATE CATEGORY =================
export const createCategory = async (req, res, next) => {
  try {
    const { category_name, description } = req.body;

    if (!category_name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const [exist] = await db.execute(
      "SELECT category_id FROM category WHERE category_name = ?",
      [category_name],
    );

    if (exist.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    const [result] = await db.execute(
      `INSERT INTO category(category_name, description)
       VALUES (?, ?)`,
      [category_name, description || null],
    );

    res.status(201).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ================= GET ALL CATEGORY =================
export const getAllCategories = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `SELECT *
       FROM category
       ORDER BY category_id DESC`,
    );

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

// ================= UPDATE CATEGORY =================
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category_name, description } = req.body;

    const [exist] = await db.execute(
      "SELECT * FROM category WHERE category_id = ?",
      [id],
    );

    if (exist.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await db.execute(
      `UPDATE category
       SET category_name = ?, description = ?
       WHERE category_id = ?`,
      [
        category_name || exist[0].category_name,
        description ?? exist[0].description,
        id,
      ],
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ================= DELETE CATEGORY =================
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [exist] = await db.execute(
      "SELECT * FROM category WHERE category_id = ?",
      [id],
    );

    if (exist.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await db.execute("DELETE FROM category WHERE category_id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
// ========add service =============
export const addService = async (req, res, next) => {
  try {
    const branch_id = req.user.branch_id;

    const { service_name, description } = req.body;

    if (!req.file || !service_name || !branch_id) {
      if (req.file) removeImg(req.file.path);
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    // ✅ reusable slug call
    const slug = await generateUniqueSlug(db, "services", "slug", service_name);

    const [exist] = await db.execute(
      `SELECT service_name 
   FROM services 
   WHERE service_name = ? AND branch_id = ?`,
      [service_name, branch_id],
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

//getServicesbySlug

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
    console.log(id);
    console.log(req.file);
    const { service_name, description } = req.body;
    console.log(service_name, description);
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

// Get By Branch Services
export const getServicesByBranch = async (req, res, next) => {
  try {
    const branchId = req.user.branch_id;

    const page = Number(req.query.page) || 1;
    const limit = 10;

    // offset calculate
    const offset = (page - 1) * limit;

    // ✅ validation
    if (!branchId) {
      return res.status(400).json({
        success: false,
        message: "Branch ID is required",
      });
    }

    // ✅ total count
    const [countResult] = await db.query(
      "SELECT COUNT(*) AS total FROM services WHERE branch_id = ?",
      [branchId],
    );

    const total = countResult[0].total;

    // ✅ paginated data
    const [rows] = await db.query(
      `SELECT * 
       FROM services 
       WHERE branch_id = ?
       LIMIT ? OFFSET ?`,
      [branchId, limit, offset],
    );

    // ✅ no data
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No services found for this branch",
      });
    }

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

// get branchService by branch id for public
export const getBranchService = async (req, res, next) => {
  try {
    const branchId = req.query.branch_id;
    console.log(branchId);

    const page = Number(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    if (!branchId) {
      return res.status(400).json({
        success: false,
        message: "Branch ID is required",
      });
    }

    // total count
    const [countResult] = await db.query(
      "SELECT COUNT(*) AS total FROM services WHERE branch_id = ?",
      [branchId],
    );

    const total = countResult[0].total;

    // ✅ JOIN QUERY (main fix)
    const [rows] = await db.query(
      `
      SELECT 
        s.service_id,
        s.service_name,
        s.description,
        s.service_image,
        s.branch_id,
        b.branch_name
      FROM services s
      LEFT JOIN branch b ON s.branch_id = b.branch_id
      WHERE s.branch_id = ?
      LIMIT ? OFFSET ?
      `,
      [branchId, limit, offset],
    );

    if (rows.length === 0) {
      return res.status(201).json({
        success: false,
        message: "No services found for this branch",
      });
    }

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      count: rows.length,
      data: rows,
    });
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
