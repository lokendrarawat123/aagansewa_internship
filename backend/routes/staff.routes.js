import express from "express";
import {
  addStaff,
  getStaff,
  updateStaff,
  deleteStaff,
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

export default staffRouter;
