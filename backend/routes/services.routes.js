import express from "express";

import {
  addServices,
  deleteService,
  getServices,
  updateService,
} from "../controllers/services.controller.js";
import { uploadService } from "../utils/multerHandler.js";
import { isLogin } from "../middlewares/isLogin.js";

const serviceRouter = express.Router();

serviceRouter.post(
  "/add-services",
  isLogin,
  uploadService.single("image"),
  addServices
);
serviceRouter.get("/get-services", isLogin, getServices);
serviceRouter.delete("/delete-services/:id", isLogin, deleteService);
serviceRouter.patch("/update-services/:id", isLogin, updateService);

export default serviceRouter;
