import db from "../config/db_connect.js";

// Add Staff
export const addStaff = async (req, res, next) => {
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
        password,
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
    const [staffList] = await db.execute("SELECT * FROM staff ");
    res.status(200).json({
      message: "Staff fetched successfully",
      staff: staffList,
    });
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
