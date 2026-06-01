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
} from "../controllers/staff.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuthorizedRoles.js";

const staffRouter = express.Router();

// Staff CRUD operations
staffRouter.post("/add-staff", isLogin, authorizeRoles("manager"), addStaff);

staffRouter.patch("/update-staff/:id", isLogin, updateStaff);
staffRouter.delete(
  "/delete-staff/:id",
  isLogin,
  authorizeRoles("manager"),
  deleteStaff,
);

// Additional staff routes

staffRouter.get("/get-allStaff", getAllStaff);
staffRouter.get("/get-staff-branch", getStaffByBranch);

// Authentication routes
staffRouter.post("/login", login);
staffRouter.post("/logout", logout);
staffRouter.post("/forgotpassword", forgotPassword);
export default staffRouter;
