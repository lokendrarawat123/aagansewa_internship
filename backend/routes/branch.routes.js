import express from "express";
import {
  addBranch,
  addDistrict,
  addProvince,
  deleteBranch,
  deleteDistrict,
  deleteProvince,
  getBranch,
  getDistrict,
  getProvince,
} from "../controllers/branch.controller.js";

const branchRouter = express.Router();
branchRouter.post("/add-province", addProvince);
branchRouter.get("/get-province", getProvince);
branchRouter.delete("/delete-province/:id", deleteProvince);
branchRouter.post("/add-district", addDistrict);
branchRouter.get("/get-district/:id", getDistrict);
branchRouter.delete("/delete-district/:id", deleteDistrict);
branchRouter.post("/add-branch", addBranch);
branchRouter.get("/get-branch", getBranch);
branchRouter.delete("/delete-branch/:id", deleteBranch);

export default branchRouter;
