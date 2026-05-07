import db from "../config/db_connect.js";
import { removeImg } from "../utils/removeImg.js";
import { compressImg } from "../utils/sharphandler.js";

export const addTrustedCostumer = async (req, res, next) => {
  try {
    const { name } = req.body;
    const trusted_image = req.file;

    if (!name || !trusted_image) {
      if (req.file) {
        removeImg(req.file.path);
      }
      return res.status(400).json({ message: "Name and image are required" });
    }

    // compress and save

    let imagePath = "";
    if (req.file) {
      const outputPath = `uploads/costumer/school-${req.file.filename}`;
      await compressImg(req.file.path, outputPath);
      imagePath = outputPath;
    }
    // const photopath = `uploads/trusted/${trusted_image.filename}`;
    // await compressImg(trusted_image.path, imagePath);

    // save to DB
    await db.execute(
      "INSERT INTO trusted_costumer (name, image) VALUES (?, ?)",
      [name, imagePath],
    );

    res.status(201).json({ message: "Trusted customer added successfully" });
  } catch (error) {
    if (req.file) {
      removeImg(req.file.path);
    }
    next(error);
  }
};
export const getTrustedCustomers = async (req, res, next) => {
  try {
    // Fetch all trusted customers
    const [customers] = await db.execute(
      "SELECT * FROM  trusted_costumer ORDER BY created_at DESC",
    );

    if (customers.length === 0) {
      return res.status(404).json({ message: "No trusted customers found" });
    }

    res.status(200).json({
      message: "Trusted costumer fetched successfully",
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
      "SELECT name, image FROM trusted_costumer WHERE costumer_id = ?",
      [id],
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
    await db.execute("DELETE FROM trusted_costumer WHERE costumer_id = ?", [
      id,
    ]);

    res.status(200).json({
      message: `${customer.name} name's costomer has been deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

// Add Review
export const addReview = async (req, res, next) => {
  try {
    const { name, position, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await db.execute(
      "INSERT INTO review (name, position, description) VALUES (?, ?, ?)",
      [name, position || null, description],
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
      "SELECT * FROM review ORDER BY review_id DESC",
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
      [id],
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    await db.execute("DELETE FROM review WHERE review_id = ?", [id]);

    res.status(200).json({
      message: `${result[0].name}'s review deleted successfully`,
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
      [branch_id],
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
      [name, phone, address, email || null, description || null, branch_id],
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
    const { id } = req.params;
    const inquiry_id = id;

    // Check if id is provided
    if (!inquiry_id) {
      return res.status(400).json({ message: "Inquiry ID is required" });
    }
    const [result] = await db.execute(
      "select inquiry_id from inquiry where inquiry_id = ? ",
      [inquiry_id],
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
// Get inquiry by ID
export const getInquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Please provide inquiry ID" });
    }

    const [result] = await db.execute(
      "SELECT * FROM inquiry WHERE inquiry_id = ?",
      [id],
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    res.status(200).json({
      message: "Inquiry fetched successfully",
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
};

// Get all inquiries
export const getAllInquiry = async (req, res, next) => {
  try {
    // inquiry (i) ra branch (b) table join gareko
    // i.branch_id = b.id (tapaiko column name anusar check garnuhos)
    const [allInquiry] = await db.execute(`
      SELECT 
        i.*, 
        b.branch_name 
      FROM inquiry i
      LEFT JOIN branch b ON i.branch_id = b.branch_id
      ORDER BY i.created_at DESC
    `);

    res.status(200).json({
      message: "All inquiries with branch details fetched successfully",
      count: allInquiry.length,
      data: allInquiry,
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    next(error);
  }
};

// Get inquiries by branch ID
export const getInquiryByBranch = async (req, res, next) => {
  try {
    const { branch_id } = req.params;

    if (!branch_id) {
      return res.status(400).json({ message: "Please provide branch ID" });
    }

    const [result] = await db.execute(
      "SELECT * FROM inquiry WHERE branch_id = ? ORDER BY created_at DESC",
      [branch_id],
    );

    res.status(200).json({
      message: "Branch inquiries fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Update inquiry
export const updateInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, branch_id, description } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Please provide inquiry ID" });
    }

    const [existing] = await db.execute(
      "SELECT * FROM inquiry WHERE inquiry_id = ?",
      [id],
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    const oldInquiry = existing[0];

    await db.execute(
      "UPDATE inquiry SET name=?, email=?, phone=?, address=?, branch_id=?, description=? WHERE inquiry_id=?",
      [
        name || oldInquiry.name,
        email || oldInquiry.email,
        phone || oldInquiry.phone,
        address || oldInquiry.address,
        branch_id || oldInquiry.branch_id,
        description || oldInquiry.description,
        id,
      ],
    );

    res.status(200).json({ message: "Inquiry updated successfully" });
  } catch (error) {
    next(error);
  }
};

//get inquiry api (for authenticated users)
export const getInquiry = async (req, res, next) => {
  try {
    const { email, role } = req.user;

    let allInquiry = [];

    // admin → all inquiries
    if (role === "admin") {
      const [rows] = await db.execute(
        "SELECT * FROM inquiry ORDER BY created_at DESC",
      );
      allInquiry = rows;
    }

    // manager → own branch inquiries
    if (role === "manager") {
      // get manager branch
      const [branchRows] = await db.execute(
        "SELECT branch_id FROM users WHERE email = ?",
        [email],
      );

      if (branchRows.length === 0 || !branchRows[0].branch_id) {
        return res.status(400).json({
          message: "Branch not assigned to this manager",
        });
      }

      const branch_id = branchRows[0].branch_id;

      const [rows] = await db.execute(
        "SELECT * FROM inquiry WHERE branch_id = ? ORDER BY created_at DESC",
        [branch_id],
      );

      allInquiry = rows;
    }

    res.status(200).json({
      message: "Successfully displayed inquiry",
      data: allInquiry,
    });
  } catch (error) {
    next(error);
  }
};

// Get review by ID
export const getReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Please provide review ID" });
    }

    const [result] = await db.execute(
      "SELECT * FROM review WHERE review_id = ?",
      [id],
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      message: "Review fetched successfully",
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
};

// Get all reviews
export const getAllReview = async (req, res, next) => {
  try {
    const [reviews] = await db.execute(
      "SELECT * FROM review ORDER BY created_at DESC",
    );

    res.status(200).json({
      message: "All reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// Get reviews by branch ID
export const getReviewByBranch = async (req, res, next) => {
  try {
    const { branch_id } = req.params;

    if (!branch_id) {
      return res.status(400).json({ message: "Please provide branch ID" });
    }

    const [result] = await db.execute(
      "SELECT * FROM review WHERE branch_id = ? ORDER BY created_at DESC",
      [branch_id],
    );

    res.status(200).json({
      message: "Branch reviews fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Update review
export const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, position, description } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Please provide review ID" });
    }

    const [existing] = await db.execute(
      "SELECT * FROM review WHERE review_id = ?",
      [id],
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    const oldReview = existing[0];

    await db.execute(
      "UPDATE review SET name=?, position=?, description=? WHERE review_id=?",
      [
        name || oldReview.name,
        position || oldReview.position,
        description || oldReview.description,
        id,
      ],
    );

    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Partner APIs
// Get partner by ID
export const getPartnerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Please provide partner ID" });
    }

    const [result] = await db.execute(
      "SELECT * FROM trusted_costumer WHERE costumer_id = ?",
      [id],
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Partner not found" });
    }

    res.status(200).json({
      message: "Partner fetched successfully",
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
};

// Get all partners
export const getAllPartner = async (req, res, next) => {
  try {
    const [partners] = await db.execute(
      "SELECT * FROM trusted_costumer ORDER BY created_at DESC",
    );

    res.status(200).json({
      message: "All partners fetched successfully",
      data: partners,
    });
  } catch (error) {
    next(error);
  }
};

// Get partners by branch ID
export const getPartnerByBranch = async (req, res, next) => {
  try {
    const { branch_id } = req.params;

    if (!branch_id) {
      return res.status(400).json({ message: "Please provide branch ID" });
    }

    const [result] = await db.execute(
      "SELECT * FROM trusted_costumer WHERE branch_id = ? ORDER BY created_at DESC",
      [branch_id],
    );

    res.status(200).json({
      message: "Branch partners fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Add partner (alias for addTrustedCostumer)
export const addPartner = addTrustedCostumer;

// Update partner
export const updatePartner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const image = req.file;

    if (!id) {
      return res.status(400).json({ message: "Please provide partner ID" });
    }

    const [existing] = await db.execute(
      "SELECT * FROM trusted_costumer WHERE costumer_id = ?",
      [id],
    );

    if (existing.length === 0) {
      if (req.file) {
        removeImg(req.file.path);
      }
      return res.status(404).json({ message: "Partner not found" });
    }

    const oldPartner = existing[0];
    let imagePath = oldPartner.image;

    if (req.file) {
      const outputPath = `uploads/costumer/school-${req.file.filename}`;
      await compressImg(req.file.path, outputPath);
      imagePath = outputPath;
      if (oldPartner.image) {
        removeImg(oldPartner.image);
      }
    }

    await db.execute(
      "UPDATE trusted_costumer SET name=?, image=? WHERE costumer_id=?",
      [name || oldPartner.name, imagePath, id],
    );

    res.status(200).json({ message: "Partner updated successfully" });
  } catch (error) {
    if (req.file) {
      removeImg(req.file.path);
    }
    next(error);
  }
};

// Delete partner (alias for deleteTrustedCustomer)
export const deletePartner = deleteTrustedCustomer;
