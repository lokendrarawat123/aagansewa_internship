import express from "express";
import {
  addService,
  deleteService,
  getAllServicesWithBranch,
  getServiceById,
  getServices,
  getServicesByBranchId,
  getServicesBySlug,
  publicGetServices,
  updateService,
  vision,
} from "../controllers/services.controller.js";
import { uploadService } from "../utils/multerHandler.js";
import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuthorizedRoles.js";

const serviceRouter = express.Router();

// Public Routes
serviceRouter.get("/get-all-service", getAllServicesWithBranch);
serviceRouter.get("/get-service", publicGetServices);
serviceRouter.get("/get-service/:id", getServiceById);
serviceRouter.get("/get-services/:branchId", getServicesByBranchId);
serviceRouter.get("/get/:slug", getServicesBySlug);

// Protected Routes (Admin/Manager)
serviceRouter.post(
  "/add-service",
  isLogin,
  authorizeRoles("admin", "manager"),
  uploadService.single("image"),
  addService,
);
serviceRouter.get(
  "/admin/get-list",
  isLogin,
  authorizeRoles("admin", "manager"),
  getServices,
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
serviceRouter.get("/getservice/:province_id", vision);
export default serviceRouter;
