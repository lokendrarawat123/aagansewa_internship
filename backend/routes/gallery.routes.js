import express from "express";
import { uploadGallery } from "../utils/multerHandler.js";
import {
  addGallery,
  deleteGallery,
  getGallery,
} from "../controllers/gallery.controller.js";

import { isLogin } from "../middlewares/isLogin.js";
const galleryRouter = express.Router();
galleryRouter.post(
  "/add-Gallery",
  uploadGallery.array("images", 20),
  isLogin,
  addGallery
);
galleryRouter.get("/get-Gallery", isLogin, getGallery);
galleryRouter.delete("/delete-Gallery/:id", isLogin, deleteGallery);

export default galleryRouter;
