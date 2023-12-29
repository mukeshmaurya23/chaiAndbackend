import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

dotenv.config({
  path: "./.env",
});

//middlewares

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//All routes here

import userRoutes from "./routes/user.routes.js";

app.use("/api/v1/users", userRoutes);

export { app };

//api/v1/users/login
