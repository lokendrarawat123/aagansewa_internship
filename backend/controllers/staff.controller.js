import bcrypt from "bcryptjs";
import db from "../config/db_connect.js";

// Add Staff
export const addStaff = async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      name,
      position,
      email,
      password,
      phone,
      description,
      service_id,
      branch_id,
    } = req.body;

    // console.log(req.body);

    if (!name || !email || !password || !service_id || !branch_id) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    //check the user already exist or not
    const [exist] = await db.execute("select name from staff where email= ?", [
      email,
    ]);
    if (exist.length > 0) {
      return res.status(409).json({
        message: `email  already exist use diffrent email `,
      });
    }
    // Check service exists
    const [service] = await db.execute(
      "SELECT * FROM services WHERE service_id = ?",
      [service_id]
    );
    if (service.length === 0)
      return res.status(404).json({ message: "Service not found" });

    // Check branch exists
    const [branch] = await db.execute(
      "SELECT * FROM branch WHERE branch_id = ?",
      [branch_id]
    );
    if (branch.length === 0)
      return res.status(404).json({ message: "Branch not found" });
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      `INSERT INTO staff
      (name, position, email, phone,  description, service_id, branch_id, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        position ?? "staff",
        email,
        phone ?? null,
        description ?? null,
        service_id,
        branch_id,
        hashedPassword,
      ]
    );

    res.status(201).json({
      message: `Staff added successfully in ${branch[0].branch_name} branch`,
    });
  } catch (error) {
    next(error);
  }
};

// Get all staff
export const getStaff = async (req, res, next) => {
  try {
    const { email, role } = req.user;
    if (role === "admin") {
      const [staffList] = await db.execute("SELECT * FROM staff ");
      res.status(200).json({
        message: "Staff fetched successfully ",
        staff: staffList,
      });
    } else if (role === "manager") {
      const [id] = await db.execute(
        "select branch_id from  users where email = ?",
        [email]
      );
      const branch_id = id[0].branch_id;
      const [staffList] = await db.execute(
        "SELECT * FROM staff where branch_id = ?",
        [branch_id]
      );
      res.status(200).json({
        message: "Staff fetched successfully",
        staff: staffList,
      });
    } else {
      return res.status(403).json({
        message: "acceess denied",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Update Staff
export const updateStaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      position,
      email,
      phone,

      description,
      service_id,
      branch_id,
    } = req.body;
    console.log(req.body);

    const [existing] = await db.execute(
      `
      SELECT * FROM staff 
      WHERE staff_id = ? `,
      [id]
    );
    if (existing.length === 0)
      return res.status(404).json({ message: "Staff not found" });
    if (email) {
      const [existEmail] = await db.execute(
        "select email from staff where email = ? and staff_id !=?",
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
    if (service_id) {
      const [service] = await db.execute(
        "SELECT * FROM services WHERE service_id = ?",
        [service_id]
      );
      if (service.length === 0)
        return res.status(404).json({ message: "Service not found" });
    }

    if (branch_id) {
      const [branch] = await db.execute(
        "SELECT * FROM branch WHERE branch_id = ?",
        [branch_id]
      );
      if (branch.length === 0)
        return res.status(404).json({ message: "Branch not found" });
    }

    const updateName = name || oldStaff.name;
    const updatePositon = position || oldStaff.position;
    const updateEmail = email || oldStaff.email;
    const updatePhone = phone || oldStaff.phone;
    const updateDescription = description || oldStaff.description;
    const updateServiceId = service_id || oldStaff.service_id;
    const updteBranchId = branch_id || oldStaff.branch_id;

    await db.execute(
      "UPDATE staff SET name=?, position=?, email=?, phone=?, description=?, service_id=?, branch_id=? WHERE staff_id=?",
      [
        updateName,
        updatePositon,
        updateEmail,
        updatePhone,

        updateDescription,
        updateServiceId,
        updteBranchId,
        id,
      ]
    );

    res.status(200).json({ message: "Staff updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete Staff
export const deleteStaff = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [existing] = await db.execute(
      "SELECT name FROM staff WHERE staff_id = ?",
      [id]
    );
    if (existing.length === 0)
      return res.status(404).json({ message: "Staff not found" });

    await db.execute("DELETE FROM staff WHERE staff_id = ?", [id]);

    res.status(200).json({ message: `${id}th deleted successfully` });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const [staff] = await db.execute(
      "SELECT staff_id FROM staff WHERE email = ?",
      [email]
    );
    if (staff.length === 0)
      return res.status(404).json({ message: "Email not found" });

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000);

    // Store code in DB
    await db.execute("UPDATE staff SET reset_code = ? WHERE email = ?", [
      code,
      email,
    ]);

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${code}`,
    });

    res.status(200).json({ message: "Reset code sent to your email" });
  } catch (error) {
    next(error);
  }
};
export const verifyCode = async (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: "Code required" });

    // Find staff by code
    const [staff] = await db.execute(
      "SELECT staff_id FROM staff WHERE reset_code = ?",
      [code]
    );
    if (staff.length === 0)
      return res.status(400).json({ message: "Invalid code" });

    // Code is valid → user can now set new password
    res.status(200).json({ message: "Code verified, now enter new password" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { code, newPassword } = req.body;
    if (!code || !newPassword)
      return res
        .status(400)
        .json({ message: "Code and new password required" });

    // Find staff by code
    const [staff] = await db.execute(
      "SELECT staff_id FROM staff WHERE reset_code = ?",
      [code]
    );
    if (staff.length === 0)
      return res.status(400).json({ message: "Invalid code" });

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password & clear reset_code
    await db.execute(
      "UPDATE staff SET password = ?, reset_code = NULL WHERE reset_code = ?",
      [hashedPassword, code]
    );

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    // first we need to get user password and email

    // console.log(req.body);
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All  inputs are  required" });
    }

    //2. now we find the user is exist or not
    const [result] = await db.execute("select * from staff where email =? ", [
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
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // for 7 day
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
