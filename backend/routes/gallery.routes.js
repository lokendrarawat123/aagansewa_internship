import express from "express";
import { uploadGallery } from "../utils/multerHandler.js";
import {
  addGallery,
  deleteGallery,
  getGallery,
} from "../controllers/gallery.controller.js";

import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuthorizedRoles.js";
import { authorizeBranchAccess } from "../middlewares/branchAceess.js";
const galleryRouter = express.Router();
galleryRouter.post(
  "/add-Gallery",
  isLogin,
  authorizeRoles("admin", "manager"),
  uploadGallery.array("images", 20),
  authorizeBranchAccess,

  addGallery
);
galleryRouter.get(
  "/get-Gallery",
  isLogin,
  authorizeRoles("admin", "manager"),
  getGallery
);
galleryRouter.delete(
  "/delete-Gallery/:id",
  isLogin,
  authorizeRoles("admin", "manager"),
  deleteGallery
);

export default galleryRouter;
