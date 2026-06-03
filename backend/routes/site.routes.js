import express from "express";
import {
  addInquiry,
  addReview,
  addTrustedCostumer,
  deleteInquiry,
  deleteReview,
  deleteTrustedCustomer,
  getReview,
  getTrustedCustomers,
  getAllInquiry,
  getInquiryByBranch,
  updateInquiry,
  updateReview,
  getBranchInquiry,
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

siteRouter.delete(
  "/delete-trusted-costumer/:id",
  isLogin,
  deleteTrustedCustomer,
);
// Partner routes (aliases for trusted customer)

siteRouter.get("/get-customer", getTrustedCustomers);

// ...........Review routes......................
siteRouter.post("/add-review", addReview);
siteRouter.get("/get-review", getReview);
siteRouter.delete(
  "/delete-review/:id",
  isLogin,
  authorizeRoles("admin"),
  deleteReview,
);

siteRouter.patch(
  "/update-review/:id",
  isLogin,
  authorizeRoles("admin"),
  updateReview,
);
// Inquiry routes
siteRouter.post("/add-inquiry", isLogin, authorizeRoles("manager"), addInquiry);
siteRouter.get("/get-branch-inquiry", getBranchInquiry);
siteRouter.delete(
  "/delete-inquiry/:id",
  isLogin,
  authorizeRoles("manager"),
  deleteInquiry,
);

siteRouter.get("/get-allInquiry", getAllInquiry); // for the all inquiry not authenticated
siteRouter.get("/get-inquiry-branch", isLogin, getInquiryByBranch);
siteRouter.patch(
  "/update-inquiry/:id",
  isLogin,
  authorizeRoles("manager"),
  updateInquiry,
);
export default siteRouter;
