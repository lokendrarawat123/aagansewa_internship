import express from "express";
import { uploadGallery } from "../utils/multerHandler.js";
import {
  addGallery,
  deleteGallery,
  getGallery,
  updateGallery,
} from "../controllers/gallery.controller.js";
const galleryRouter = express.Router();
galleryRouter.post(
  "/add-Gallery",
  uploadGallery.array("image", 20),
  addGallery
);
galleryRouter.get("/get-Gallery", getGallery);
galleryRouter.delete("/delete-Gallery/:id", deleteGallery);
galleryRouter.patch("/update-Gallery/:id", updateGallery);

export default galleryRouter;
