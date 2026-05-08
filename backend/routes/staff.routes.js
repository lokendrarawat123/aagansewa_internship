import express from "express";
import {
  addStaff,
  getStaff,
  updateStaff,
  deleteStaff,
  login,
  logout,
  getStaffById,
  getAllStaff,
  getStaffByBranch,
} from "../controllers/staff.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuthorizedRoles.js";

const staffRouter = express.Router();

// Staff CRUD operations
staffRouter.post("/add-staff", isLogin, authorizeRoles("manager"), addStaff);
staffRouter.get("/get-staff", isLogin, getStaff);
staffRouter.patch("/update-staff/:id", isLogin, updateStaff);
staffRouter.delete(
  "/delete-staff/:id",
  isLogin,
  authorizeRoles("manager"),
  deleteStaff,
);

// Additional staff routes
staffRouter.get("/get-staff/:id", getStaffById);
staffRouter.get("/get-allStaff", getAllStaff);
staffRouter.get("/branch/:branch_id/staff", getStaffByBranch);

// Authentication routes
staffRouter.post("/login", login);
staffRouter.post("/logout", logout);

export default staffRouter;
