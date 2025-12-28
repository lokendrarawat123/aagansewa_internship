import express from "express";
import {
  addStaff,
  getStaff,
  updateStaff,
  deleteStaff,
  login,
  logout,
} from "../controllers/staff.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuthorizedRoles.js";

const staffRouter = express.Router();

// Add staff
staffRouter.post("/add-staff", isLogin, addStaff);

// Get all staff
staffRouter.get("/get-staff", isLogin, getStaff);

// Update staff
staffRouter.patch("/update-staff/:id", isLogin, updateStaff);

// Delete staff
staffRouter.delete(
  "/delete-staff/:id",

  isLogin,

  authorizeRoles("manager"),
  deleteStaff
);
staffRouter.post("login", login);
staffRouter.post("login", logout);

export default staffRouter;
