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
import { isLogin } from "../middlewares/isLogin.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const branchRouter = express.Router();
branchRouter.post("/add-province", isLogin, isAdmin, addProvince);
branchRouter.get("/get-province", isLogin, isAdmin, getProvince);
branchRouter.delete("/delete-province/:id", isLogin, addBranch, deleteProvince);
branchRouter.post("/add-district", isLogin, isAdmin, addDistrict);
branchRouter.get("/get-district/:id", isLogin, isAdmin, getDistrict);
branchRouter.delete("/delete-district/:id", isLogin, isAdmin, deleteDistrict);
branchRouter.post("/add-branch", isLogin, isAdmin, addBranch);
branchRouter.get("/get-branch", isLogin, getBranch);
branchRouter.delete("/delete-branch/:id", isLogin, isAdmin, deleteBranch);

export default branchRouter;
