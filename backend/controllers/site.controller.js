import db from "../config/db_connect.js";
import { removeImg } from "../utils/removeImg.js";
import { compressImg } from "../utils/sharphandler.js";

export const addTrustedCostumer = async (req, res, next) => {
  try {
    const { name } = req.body;
    const trusted_image = req.file;

    if (!name || !trusted_image) {
      return res.status(400).json({ message: "Name and image are required" });
    }

    // compress and save
    const imagePath = `uploads/trusted/${trusted_image.filename}`;
    await compressImg(trusted_image.path, imagePath);

    // save to DB
    await db.execute(
      "INSERT INTO trusted_customers (name, image) VALUES (?, ?)",
      [name, outputPath]
    );

    res.status(201).json({ message: "Trusted customer added successfully" });
  } catch (error) {
    next(error);
  }
};
export const getTrustedCustomers = async (req, res, next) => {
  try {
    // Fetch all trusted customers
    const [customers] = await db.execute(
      "SELECT * FROM trusted_customers ORDER BY created_at DESC"
    );

    if (customers.length === 0) {
      return res.status(404).json({ message: "No trusted customers found" });
    }

    res.status(200).json({
      message: "Trusted customers fetched successfully",
      trustedCustomers: customers,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTrustedCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Please provide customer ID" });
    }

    // Check if customer exists
    const [result] = await db.execute(
      "SELECT name, image FROM trusted_customers WHERE id = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Trusted customer not found" });
    }

    const customer = result[0];

    // Delete image from disk if exists
    if (customer.image) {
      removeImg(customer.image);
    }

    // Delete from database
    await db.execute("DELETE FROM trusted_customers WHERE id = ?", [id]);

    res.status(200).json({
      message: `${customer.name} has been deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

// Add Review
export const addReview = async (req, res, next) => {
  try {
    const { name, position, description } = req.body;

    if (!name || !position || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await db.execute(
      "INSERT INTO review (name, position, description) VALUES (?, ?, ?)",
      [name, position, description]
    );

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    next(error);
  }
};

// Get Reviews
export const getReview = async (req, res, next) => {
  try {
    const [reviews] = await db.execute(
      "SELECT * FROM review ORDER BY review_id DESC"
    );

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Review
export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      "SELECT name FROM review WHERE review_id = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    await db.execute("DELETE FROM review WHERE review_id = ?", [id]);

    res.status(200).json({
      message: `${result[0].name} review deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};
//inquiry api
//add inquiry
export const addInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, address, branch_id, description } = req.body;
    console.log(name, email, phone, address, branch_id, description); // getting data from the fronted or req.body
    //return msg for the if any field is missing
    if (!name || !phone || !address || !branch_id) {
      return res
        .status(400)
        .json({ message: "please provide province all field " });
    }
    const [branch] = await db.execute(
      "select branch_id ,branch_name from branch where branch_id = ?",
      [branch_id]
    );
    if (branch.length === 0) {
      return res.status(404).json({
        message: "the branch id does not exist please use valid id",
      });
    }

    //3. insert in inquiry table
    await db.execute(
      `INSERT INTO inquiry (name, phone, address, email, description, branch_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, phone, address, email || null, description || null, branch_id]
    );

    res.status(201).json({
      message: ` your inquiry submitted successfully in ${branch[0].branch_name} branch thank you. we will contact in few minute  `,
    });
  } catch (error) {
    next(error);
  }
};
//delete inquiry
export const deleteInquiry = async (req, res, next) => {
  try {
    const { inquiry_id } = req.params;
    console.log(inquiry_id);

    // Check if id is provided
    if (!inquiry_id) {
      return res.status(400).json({ message: "Inquiry ID is required" });
    }
    const [result] = await db.execute(
      "select inquiry_id from inquiry where inquiry_id = ? ",
      [inquiry_id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    // Delete from DB
    await db.execute("DELETE FROM inquiry WHERE inquiry_id = ?", [inquiry_id]);

    res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    next(error);
  }
};
//get inquiry api
export const getInquiry = async (req, res, next) => {
  try {
    const [allInquiry] = await db.execute(
      "select * from inquiry order by created_at desc"
    );

    res.status(200).json({
      message: "success fully displayed inquiry",
      allInquiry: allInquiry,
    });
  } catch (error) {
    next(error);
  }
};
