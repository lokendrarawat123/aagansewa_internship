import express from "express";
import { addProvince, getProvince } from "../controllers/branch.controller.js";

const branchRouter = express.Router();
branchRouter.post("/add-province", addProvince);
branchRouter.get("/get-province", getProvince);

export default branchRouter;
