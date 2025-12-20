import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../config/db_connect.js";
dotenv.config();
const dot = process.env.secrete_key;
const expire = process.env.expireTime;

export const login = async (req, res, next) => {
  try {
    // first we need to get user password and email

    // console.log(req.body);
    const { email, password, role } = req.body;
    

    if (!email || !password) {
      return res.status(400).json({ message: "All  inputs are  required" });
    }

    //2. now we find the user is exist or not
    const [result] = await db.execute("select * from users where email =? ", [
      email,
    ]);
    // console.log(result[0]);
    // console.log(typeof result);
    if (result.length === 0) {
      res.status(400).json({
        message: `user not found this email ${email}`,
      });
    }
    //store the result value in any varaible
    const user = result[0];
    // console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch);
    if (!isMatch) {
      res.status(401).json({
        message: "invalid crendial",
      });
    }
    //jwt=jsonwebtoken
    //for genarate token for cookies
    //it takes 3 things
    // i.your details 2.secret key 3. expire time
    const token = await jwt.sign(
      {
        //details
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      //secrete key
      dot,
      {
        //expire time
        expiresIn: expire,
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    //else success
    res.status(200).json({
      message: "login success",
      user: {
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "succesfully sign out thank you",
    });
  } catch (error) {
    next(error);
  }
};

// managerApi

// Add Staff
export const addManager = async (req, res, next) => {
  try {
    const { name, email, password, branch_id } = req.body;

    // console.log(req.body);

    if (!name || !email || !password || !branch_id) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    //check the user already exist or not
    const [exist] = await db.execute("select name from users where email= ?", [
      email,
    ]);
    if (exist.length > 0) {
      return res.status(409).json({
        message: `email  already exist use diffrent email `,
      });
    }
    // Check service exists
    const [existBranchManager] = await db.execute(
      "SELECT * FROM users WHERE branch_id = ?",
      [branch_id]
    );
    if (existBranchManager.length > 0)
      return res
        .status(404)
        .json({ message: " branch manager is already exist" });

    // Check branch exists
    const [branch] = await db.execute(
      "SELECT * FROM branch WHERE branch_id = ?",
      [branch_id]
    );
    if (branch.length === 0)
      return res.status(404).json({ message: "Branch not found" });
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      `INSERT INTO users
      (name, email, password, branch_id)
      VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, branch_id]
    );

    res.status(201).json({
      message: `Manager  added successfully in ${branch[0].branch_name} branch`,
    });
  } catch (error) {
    next(error);
  }
};

// Get all staff
export const getManager = async (req, res, next) => {
  try {
    const [manager] = await db.execute("SELECT * FROM users ");
    res.status(200).json({
      message: "Manager fetched successfully",
      managers: manager,
    });
  } catch (error) {
    next(error);
  }
};

// Update Staff
export const updateManager = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,

      email,

      branch_id,
    } = req.body;

    const [existing] = await db.execute(
      `
      SELECT * FROM users 
      WHERE user_id = ? `,
      [id]
    );
    if (existing.length === 0)
      return res.status(404).json({ message: "Manager not found" });
    if (email) {
      const [existEmail] = await db.execute(
        "select email from users where email = ? and user_id !=?",
        [email, id]
      );
      if (existEmail.length > 0) {
        return res.status(409).json({
          message: `email  already exist use diffrent email `,
        });
      }
    }
    const oldStaff = existing[0];

    // Optional: Validate service and branch if provided

    if (branch_id) {
      const [branch] = await db.execute(
        "SELECT * FROM branch WHERE branch_id = ?",
        [branch_id]
      );
      if (branch.length === 0)
        return res.status(404).json({ message: "Branch not found" });
    }

    const updateName = name || oldStaff.name;

    const updateEmail = email || oldStaff.email;

    const updteBranchId = branch_id || oldStaff.branch_id;

    await db.execute(
      "UPDATE users SET name=?, email=?,  branch_id=? WHERE user_id=?",
      [updateName, updateEmail, updteBranchId, id]
    );

    res.status(200).json({ message: "Manager updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete Staff
export const deleteManager = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [existing] = await db.execute(
      "SELECT user_id FROM users WHERE user_id = ?",
      [id]
    );
    if (existing.length === 0)
      return res.status(404).json({ message: "Manager not found" });

    await db.execute("DELETE FROM users WHERE user_id = ?", [id]);

    res.status(200).json({ message: `${id}th Manager deleted successfully` });
  } catch (error) {
    next(error);
  }
};
