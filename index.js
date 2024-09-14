import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import shortUrl from "./routes/shortUrl.js";
// import { signIn } from "../controller/sigIn.js";
// import { signUp } from "../controller/signUp.js";
dotenv.config();

// app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/", shortUrl);
// router.get("/signIn", signIn);
// router.post("/signUp", signUp);

// connect database mongodb
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`);
    console.log(
      "Database is Connected",
      "\nConnection Host=" + connect.connection.host,
      "\nConnection Name=" + connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// call connectdb
connectDB();

//
app.get("/", (req, res) => {
  res.send("Hello Its redponding");
});

app.listen(3000, () => {
  console.log(" Surver is running on 3000");
});
