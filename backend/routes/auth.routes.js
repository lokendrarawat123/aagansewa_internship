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

import { authorizeRoles } from "../middlewares/isAuthorizedRoles.js";

const authRouter = express.Router();
authRouter.post("/login", login);
authRouter.post("/logout", logout);
// Add manager
authRouter.post("/add-manager", isLogin, authorizeRoles("admin"), addManager);

// Get all manager
authRouter.get("/get-manager", isLogin, authorizeRoles("admin"), getManager);

// Update manager
authRouter.patch(
  "/update-manager/:id",
  isLogin,
  authorizeRoles("admin"),
  updateManager
);

// Delete manager
authRouter.delete(
  "/delete-manager/:id",
  isLogin,
  authorizeRoles("admin"),
  deleteManager
);

export default authRouter;
