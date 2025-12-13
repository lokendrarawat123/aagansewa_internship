import express from "express";
import dotenv from "dotenv";
import db from "./config/db_connect.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
try {
  await db.connect();

  console.log("connected to database");
} catch (error) {
  console.log("database connection failed" + error);
}
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
