import express from "express";
import {
  addBranch,
  addDistrict,
  addProvince,
  deleteBranch,
  deleteDistrict,
  deleteProvince,
  getAllDistrict,
  getBranchByDistrict,
  getAllProvince,
  getProvinceWithDistrict,
  getprovinceById,
  getDistrictById,
  getAllDistrictWithBranch,
  getDistrictByProvinceID,
  getAllBranch,
  getBranchById,
  filteredBranches,
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

branchRouter.get("/get-district/:id", getDistrictById);
branchRouter.get("/get-districtwitbranch", getAllDistrictWithBranch);
branchRouter.get("/get-all-district", getAllDistrict);
branchRouter.get("/get-districts/:province_id", getDistrictByProvinceID);
branchRouter.post(
  "/add-district",
  isLogin,
  authorizeRoles("admin"),
  addDistrict,
);
branchRouter.delete(
  "/delete-district/:id",
  isLogin,
  authorizeRoles("admin"),
  deleteDistrict,
);
branchRouter.post("/add-branch", isLogin, authorizeRoles("admin"), addBranch);
branchRouter.get("/get-branch", getAllBranch);
branchRouter.get("/get-branchs/:district_id", getBranchByDistrict);
branchRouter.get("/get-branch/:id", getBranchById);
branchRouter.get("/get-filteredBranches", filteredBranches);

branchRouter.delete(
  "/delete-branch/:id",
  isLogin,
  authorizeRoles("admin"),
  deleteBranch,
);

export default branchRouter;
