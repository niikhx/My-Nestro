import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";

const server = express();

import categoryRouter from "./routers/category.routers.js";
import roomRouter from "./routers/room.routers.js";
import cartRouter from "./routers/cart.router.js";
import productRouter from "./routers/product.router.js";
import userRouterr from "./routers/user.routers.js";
import OrderRouter from "./routers/order.router.js";

const PORT = process.env.PORT || 5000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors({ origin: "http://localhost:3000", credentials: true }));

server.use("/api/category", categoryRouter);
server.use("/api/room", roomRouter);
server.use("/api/product", productRouter);
server.use("/api/cart", cartRouter);
server.use("/api/user", userRouterr);
server.use("/api/order", OrderRouter);

// Database pehle connect ho, fir server listen shuru ho
const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();