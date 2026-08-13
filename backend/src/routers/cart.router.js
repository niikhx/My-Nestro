import express from "express";
import { syncCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/sync-cart", syncCart);

export default router;
