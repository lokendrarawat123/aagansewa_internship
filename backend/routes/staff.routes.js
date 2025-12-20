import express from "express";
import {
  addStaff,
  getStaff,
  updateStaff,
  deleteStaff,
  login,
  logout,
} from "../controllers/staff.controller.js";

const staffRouter = express.Router();

// Add staff
staffRouter.post("/add-staff", addStaff);

// Get all staff
staffRouter.get("/get-staff", getStaff);

// Update staff
staffRouter.patch("/update-staff/:id", updateStaff);

// Delete staff
staffRouter.delete("/delete-staff/:id", deleteStaff);
staffRouter.post("login", login);
staffRouter.post("login", logout);

export default staffRouter;
