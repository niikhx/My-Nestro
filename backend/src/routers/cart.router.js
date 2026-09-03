import express from "express";
import { syncCart, updateCartQuantity } from "../controllers/cart.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/sync-cart", protect, syncCart);
router.put("/item/:product_id", protect, updateCartQuantity);

export default router;
