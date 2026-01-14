import express from "express";
import {
  addBranch,
  addDistrict,
  addProvince,
  deleteBranch,
  deleteDistrict,
  deleteProvince,
  getAllDistrict,
  getBranch,
  getBranchByDistrict,
  getDistrict,
  getProvince,
} from "../controllers/branch.controller.js";
import { isLogin } from "../middlewares/isLogin.js";

import { authorizeRoles } from "../middlewares/isAuthorizedRoles.js";

const branchRouter = express.Router();
branchRouter.post(
  "/add-province",
  isLogin,
  authorizeRoles("admin"),
  addProvince
);
branchRouter.get(
  "/get-province",
  isLogin,
  authorizeRoles("admin"),
  getProvince
);
branchRouter.delete(
  "/delete-province/:id",
  isLogin,
  authorizeRoles("admin"),
  deleteProvince
);
branchRouter.post(
  "/add-district",
  isLogin,
  authorizeRoles("admin"),
  addDistrict
);
branchRouter.get("/get-district", getDistrict);
branchRouter.get("/get-all-district", getAllDistrict);
branchRouter.delete(
  "/delete-district/:id",
  isLogin,
  authorizeRoles("admin"),
  deleteDistrict
);
branchRouter.post("/add-branch", isLogin, authorizeRoles("admin"), addBranch);
branchRouter.get("/get-branch", isLogin, authorizeRoles("admin"), getBranch);
branchRouter.get("/get-branchs/:district_id", getBranchByDistrict);
branchRouter.delete(
  "/delete-branch/:id",
  isLogin,
  authorizeRoles("admin"),
  deleteBranch
);

export default branchRouter;
