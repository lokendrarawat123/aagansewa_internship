import express from "express";
import {
  addInquiry,
  addReview,
  addTrustedCostumer,
  deleteInquiry,
  deleteReview,
  deleteTrustedCustomer,
  getInquiry,
  getReview,
  getTrustedCustomers,
} from "../controllers/site.controller.js";
import { uploadCostumer } from "../utils/multerHandler.js";

const siteRouter = express.Router();

siteRouter.post(
  "/add-trusted-costumer",
  uploadCostumer.single("image"), // single image
  addTrustedCostumer
);
siteRouter.get("/get-trusted-costumer", getTrustedCustomers);
siteRouter.delete("/delete-trusted-costumer/:id", deleteTrustedCustomer);

siteRouter.post("/review/add-review", addReview);
siteRouter.get("/review/get-review", getReview);
siteRouter.delete("/review/delete-review/:id", deleteReview);

siteRouter.post("/inquiry/add-inquiry", addInquiry);
siteRouter.get("/inquiry/get-inquiry", getInquiry);
siteRouter.delete("/inquiry/delete-inquiry/:id", deleteInquiry);

export default siteRouter;
