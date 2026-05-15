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
  getInquiryById,
  getAllInquiry,
  getInquiryByBranch,
  updateInquiry,
  getReviewById,
  getAllReview,
  getReviewByBranch,
  updateReview,
  getPartnerById,
  getAllPartner,
  getPartnerByBranch,
  addPartner,
  updatePartner,
  deletePartner,
} from "../controllers/site.controller.js";
import { uploadCostumer } from "../utils/multerHandler.js";
import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuthorizedRoles.js";

const siteRouter = express.Router();
// Trusted Customer/Partner routes
siteRouter.post(
  "/add-trusted-costumer",
  uploadCostumer.single("image"),
  isLogin,
  addTrustedCostumer,
);
siteRouter.get("/get-trusted-costumer", getTrustedCustomers);
siteRouter.delete(
  "/delete-trusted-costumer/:id",
  isLogin,
  deleteTrustedCustomer,
);
// Partner routes (aliases for trusted customer)
siteRouter.get("/get-partner/:id", getPartnerById);
siteRouter.get("/get-allPartner", getAllPartner);
siteRouter.get("/branch/:branch_id/partner", getPartnerByBranch);
siteRouter.post(
  "/add-partner",
  uploadCostumer.single("image"),
  isLogin,
  addPartner,
);
siteRouter.patch(
  "/update-partner/:id",
  uploadCostumer.single("image"),
  isLogin,
  updatePartner,
);
siteRouter.delete("/delete-partner/:id", isLogin, deletePartner);
// Review routes
siteRouter.post("/add-review", addReview);
siteRouter.get("/get-review", getReview);
siteRouter.delete(
  "/delete-review/:id",
  isLogin,
  authorizeRoles("manager"),
  deleteReview,
);
siteRouter.get("/get-review/:id", getReviewById);
siteRouter.get("/get-allReview", getAllReview);
siteRouter.get("/branch/:branch_id/review", getReviewByBranch);
siteRouter.patch(
  "/update-review/:id",
  isLogin,
  authorizeRoles("manager"),
  updateReview,
);
// Inquiry routes
siteRouter.post("/add-inquiry", isLogin, authorizeRoles("manager"), addInquiry);
siteRouter.get("/get-inquiry", getInquiry);
siteRouter.delete(
  "/delete-inquiry/:id",
  isLogin,
  authorizeRoles("manager"),
  deleteInquiry,
);
siteRouter.get("/get-inquiry/:id", getInquiryById);
siteRouter.get("/get-allInquiry", getAllInquiry); // for the all inquiry not authenticated
siteRouter.get("/site/getInquiryByBranch", getInquiryByBranch);
siteRouter.patch(
  "/update-inquiry/:id",
  isLogin,
  authorizeRoles("manager"),
  updateInquiry,
);
export default siteRouter;
