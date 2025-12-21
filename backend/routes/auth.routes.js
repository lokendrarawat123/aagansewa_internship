import express from "express";
import {
  addManager,
  deleteManager,
  getManager,
  login,
  logout,
  updateManager,
} from "../controllers/auth.controller.js";
import { isLogin } from "../middlewares/isLogin.js";

import { isAdmin } from "../middlewares/isAdmin.js";

const authRouter = express.Router();
authRouter.post("/login", login);
authRouter.post("/logout", logout);
// Add manager
authRouter.post("/add-manager", isLogin, isAdmin, addManager);

// Get all manager
authRouter.get("/get-manager", isLogin, isAdmin, getManager);

// Update manager
authRouter.patch("/update-manager/:id", isLogin, isAdmin, updateManager);

// Delete manager
authRouter.delete("/delete-manager/:id", isLogin, isAdmin, deleteManager);

export default authRouter;
