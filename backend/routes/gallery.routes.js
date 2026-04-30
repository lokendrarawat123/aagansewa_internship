import express from "express";
import { uploadGallery } from "../utils/multerHandler.js";
import {
  addGallery,
  deleteGallery,
  getGallery,
  getGalleryById,
  getAllGallery,
  getGalleryByBranch,
  updateGallery,
} from "../controllers/gallery.controller.js";

import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuthorizedRoles.js";
import { authorizeBranchAccess } from "../middlewares/branchAceess.js";

const galleryRouter = express.Router();

// Gallery CRUD operations
galleryRouter.post(
  "/add-gallery",
  isLogin,
  authorizeRoles("admin", "manager"),
  uploadGallery.array("images", 20),
  authorizeBranchAccess,
  addGallery
);
galleryRouter.get(
  "/get-gallery",
  isLogin,
  authorizeRoles("admin", "manager"),
  getGallery
);
galleryRouter.delete(
  "/delete-gallery/:id",
  isLogin,
  authorizeRoles("admin", "manager"),
  deleteGallery
);

// Additional gallery routes
galleryRouter.get("/get-gallery/:id", getGalleryById);
galleryRouter.get("/get-allGallery", getAllGallery);
galleryRouter.get("/branch/:branch_id/gallery", getGalleryByBranch);
galleryRouter.patch(
  "/update-gallery/:id",
  isLogin,
  authorizeRoles("admin", "manager"),
  uploadGallery.array("images", 20),
  updateGallery
);

export default galleryRouter;
