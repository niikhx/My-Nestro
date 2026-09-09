import express from "express";
import { getCart, syncCart, updateCartQuantity, removeCartItem } from "../controllers/cart.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/sync-cart", protect, syncCart);
router.put("/item/:product_id", protect, updateCartQuantity);
router.delete("/item/:product_id", protect, removeCartItem);

export default router;
