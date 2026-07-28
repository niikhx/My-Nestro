import dotenv from "dotenv";
dotenv.config()
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/connectDB.js";

const server = express();

import categoryRouter from "./routers/category.routers.js";
import roomRouter from "./routers/room.routers.js";
import productRouter from "./routers/product.router.js";
import userRouterr from "./routers/user.routers.js";

const PORT = process.env.PORT


server.use(express.json());
server.use(cors({ origin: "http://localhost:3000",credentials:true }));
server.use("/api/category", categoryRouter)
server.use("/api/room", roomRouter)
server.use("/api/product", productRouter)
server.use("/api/user", userRouterr)

server.listen(PORT, () => {
  connectDB()
  console.log(`server is running port ${PORT}`)
})