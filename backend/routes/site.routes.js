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
import { isLogin } from "../middlewares/isLogin.js";

const siteRouter = express.Router();

siteRouter.post(
  "/add-trusted-costumer",
  uploadCostumer.single("image"),
  isLogin,
  // single image
  addTrustedCostumer
);
siteRouter.get("/get-trusted-costumer", getTrustedCustomers);
siteRouter.delete(
  "/delete-trusted-costumer/:id",
  isLogin,
  deleteTrustedCustomer
);

siteRouter.post("/review/add-review", isLogin, addReview);
siteRouter.get("/review/get-review", getReview);
siteRouter.delete("/review/delete-review/:id", isLogin, deleteReview);

siteRouter.post("/inquiry/add-inquiry", addInquiry);
siteRouter.get("/inquiry/get-inquiry", isLogin, getInquiry);
siteRouter.delete("/inquiry/delete-inquiry/:id", isLogin, deleteInquiry);

export default siteRouter;
