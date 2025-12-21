import express from "express";
import { uploadGallery } from "../utils/multerHandler.js";
import {
  addGallery,
  deleteGallery,
  getGallery,
} from "../controllers/gallery.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isLogin } from "../middlewares/isLogin.js";
import { isManager } from "../middlewares/isManager.js";
const galleryRouter = express.Router();
galleryRouter.post(
  "/add-Gallery",
  uploadGallery.array("image", 20),
  isLogin,
  isManager,
  addGallery
);
galleryRouter.get("/get-Gallery", isLogin, getGallery);
galleryRouter.delete("/delete-Gallery/:id", isLogin, deleteGallery);

export default galleryRouter;
