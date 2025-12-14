import express from "express";
import dotenv from "dotenv";
import db from "./config/db_connect.js";
import branchRouter from "./routes/branch.routes.js";
dotenv.config();
const app = express();
app.use(express.json()); //it is use for the  the  json
const port = process.env.PORT;
app.use("/api/branch", branchRouter);
try {
  db.connect();

  // console.log("connected to database");
} catch (error) {
  console.log("database connection failed" + error);
}
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
