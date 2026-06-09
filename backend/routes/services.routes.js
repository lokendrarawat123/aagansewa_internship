import express from "express";
import {
  addService,
  deleteService,
  getAllServicesWithBranch,
  getBranchService,
  getServicesByBranch,
  getServicesBySlug,
  publicGetServices,
  updateService,
  // category
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/services.controller.js";
import { uploadService } from "../utils/multerHandler.js";
import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuthorizedRoles.js";

const serviceRouter = express.Router();

// Public Routes
serviceRouter.get("/get-all-service", getAllServicesWithBranch);
serviceRouter.get("/get-service", publicGetServices);

serviceRouter.get(
  "/get-servicesByBranch",
  isLogin,
  authorizeRoles("manager"),
  getServicesByBranch,
);
serviceRouter.get(
  "/get-branch-service",

  getBranchService,
);

serviceRouter.get("/get/:slug", getServicesBySlug);

// Protected Routes (Admin/Manager)
serviceRouter.post(
  "/add-service",
  isLogin,
  authorizeRoles("manager"),
  uploadService.single("image"),
  addService,
);

serviceRouter.patch(
  "/update-service/:id",
  isLogin,
  authorizeRoles("admin", "manager"),
  uploadService.single("image"),
  updateService,
);
serviceRouter.delete(
  "/delete-service/:id",
  isLogin,
  authorizeRoles("admin", "manager"),
  deleteService,
);

serviceRouter.post("/add-category", createCategory);
serviceRouter.get("/get-category", getAllCategories);

serviceRouter.patch("/update-category/:id", updateCategory);
serviceRouter.delete("/delete-category/:id", deleteCategory);

export default serviceRouter;
