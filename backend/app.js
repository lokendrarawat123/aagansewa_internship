import express from "express";
import dotenv from "dotenv";
import db from "./config/db_connect.js";
import branchRouter from "./routes/branch.routes.js";
import serviceRouter from "./routes/services.routes.js";
import authRouter from "./routes/auth.routes.js";
import staffRouter from "./routes/staff.routes.js";
import galleryRouter from "./routes/gallery.routes.js";
import siteRouter from "./routes/site.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json()); //it is use for the  the  json
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const port = process.env.PORT;
app.use("/api/branch", branchRouter);
app.use("/api/services", serviceRouter);
app.use("/api/staff", staffRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/site", siteRouter);
app.use("/api/auth", authRouter);

try {
  db.connect();

  // console.log("connected to database");
} catch (error) {
  console.log("database connection failed" + error);
}
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
