import express from "express";
import {
  addStaff,
  updateStaff,
  deleteStaff,
  login,
  logout,
  getAllStaff,
  getStaffByBranch,
  forgotPassword,
  getBranchStaff,
} from "../controllers/staff.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuthorizedRoles.js";

const staffRouter = express.Router();

// Staff CRUD operations
staffRouter.post("/add-staff", isLogin, authorizeRoles("manager"), addStaff);

staffRouter.patch(
  "/update-staff/:id",
  isLogin,
  authorizeRoles("manager"),
  updateStaff,
);
staffRouter.delete(
  "/delete-staff/:id",
  isLogin,
  authorizeRoles("manager"),
  deleteStaff,
);

// Additional staff routes
staffRouter.get("/get-branch-staff", getBranchStaff);
staffRouter.get("/get-all-staff", getAllStaff);

staffRouter.get("/get-staff-branch", isLogin, getStaffByBranch); // for manager

// Authentication routes
staffRouter.post("/login", login);
staffRouter.post("/logout", logout);
staffRouter.post("/forgotpassword", forgotPassword);
export default staffRouter;
