import express from "express";

import {
  addServices,
  deleteService,
  getServices,
  updateService,
} from "../controllers/services.controller.js";
import { uploadService } from "../utils/multerHandler.js";

const serviceRouter = express.Router();

serviceRouter.post("/add-services", uploadService.single("image"), addServices);
serviceRouter.get("/get-services", getServices);
serviceRouter.delete("/delete-services", deleteService);
serviceRouter.patch("/update-services", updateService);

export default serviceRouter;
