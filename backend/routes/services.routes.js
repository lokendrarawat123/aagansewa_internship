import express from "express";

import {
  addServices,
  deleteService,
  getServices,
  getServicesByBranch,
  publicGetServices,
  updateService,
} from "../controllers/services.controller.js";
import { uploadService } from "../utils/multerHandler.js";
import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuthorizedRoles.js";

const serviceRouter = express.Router();

serviceRouter.post(
  "/add-services",
  isLogin,
  authorizeRoles("admin", "manager"),
  uploadService.single("image"),

  addServices
);
serviceRouter.get(
  "/get-services",
  isLogin,
  authorizeRoles("admin", "manager"),
  getServices
);
serviceRouter.delete(
  "/delete-services/:id",
  isLogin,
  authorizeRoles("admin", "manager"),

  deleteService
);
serviceRouter.patch(
  "/update-services/:id",
  isLogin,
  authorizeRoles("admin", "manager"),
  updateService
);
serviceRouter.get("/get-services/:branchId", getServicesByBranch);
serviceRouter.get("/getAll-services", publicGetServices);

export default serviceRouter;
