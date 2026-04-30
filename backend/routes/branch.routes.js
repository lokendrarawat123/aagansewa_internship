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
  getAllProvince,
  getProvinceWithDistrict,
  getprovinceById,
} from "../controllers/branch.controller.js";
import { isLogin } from "../middlewares/isLogin.js";

import { authorizeRoles } from "../middlewares/isAuthorizedRoles.js";

const branchRouter = express.Router();
branchRouter.get("/get-province/:id", getprovinceById);
branchRouter.get("/get-allprovince", getAllProvince);
branchRouter.get("/get-provinceWithdistrict", getProvinceWithDistrict);

branchRouter.post(
  "/add-province",
  isLogin,
  authorizeRoles("admin"),
  addProvince,
);
branchRouter.delete(
  "/delete-province/:id",
  isLogin,
  authorizeRoles("admin"),
  deleteProvince,
);
branchRouter.post(
  "/add-district",
  isLogin,
  authorizeRoles("admin"),
  addDistrict,
);

branchRouter.get("/get-district", getDistrict);
branchRouter.get("/get-all-district", getAllDistrict);
branchRouter.delete(
  "/delete-district/:id",
  isLogin,
  authorizeRoles("admin"),
  deleteDistrict,
);
branchRouter.post("/add-branch", isLogin, authorizeRoles("admin"), addBranch);
branchRouter.get("/get-branch", isLogin, authorizeRoles("admin"), getBranch);
branchRouter.get("/get-branchs/:district_id", getBranchByDistrict);
branchRouter.delete(
  "/delete-branch/:id",
  isLogin,
  authorizeRoles("admin"),
  deleteBranch,
);

export default branchRouter;
