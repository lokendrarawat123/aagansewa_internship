import db from "../config/db_connect.js";

// Add Staff
export const addStaff = async (req, res, next) => {
  try {
    const {
      name,
      position,
      email,
      phone,
      role,
      description,
      service_id,
      branch_id,
    } = req.body;

    if (!name || !position || !role || !service_id || !branch_id) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Check service exists
    const [service] = await db.execute(
      "SELECT * FROM service WHERE service_id = ?",
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

    // Insert staff
    await db.execute(
      "INSERT INTO staff (name, position, email, phone, role, description, service_id, branch_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        position,
        email || null,
        phone || null,
        role,
        description || null,
        service_id,
        branch_id,
      ]
    );

    res.status(201).json({ message: "Staff added successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all staff
export const getStaff = async (req, res, next) => {
  try {
    const [staffList] = await db.execute(
      "SELECT * FROM staff ORDER BY created_at DESC"
    );
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
      role,
      description,
      service_id,
      branch_id,
    } = req.body;

    const [existing] = await db.execute(
      "SELECT * FROM staff WHERE staff_id = ?",
      [id]
    );
    if (existing.length === 0)
      return res.status(404).json({ message: "Staff not found" });

    const oldStaff = existing[0];

    // Optional: Validate service and branch if provided
    if (service_id) {
      const [service] = await db.execute(
        "SELECT * FROM service WHERE service_id = ?",
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
    const updateRole = role || oldStaff.role;
    const updateDescription = description || oldStaff.description;
    const updateServiceId = service_id || oldStaff.service_id;
    const updteBranchId = branch_id || oldStaff.branch_id;

    await db.execute(
      "UPDATE staff SET name=?, position=?, email=?, phone=?, role=?, description=?, service_id=?, branch_id=? WHERE staff_id=?",
      [
        service_id,
        updateName,
        updatePositon,
        updateEmail,
        updatePhone,
        updateRole,
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

    res
      .status(200)
      .json({ message: `${existing[0].name} deleted successfully` });
  } catch (error) {
    next(error);
  }
};
