import express from "express";
import {
  create,
  verifyOrder
  // read,
  // readById,
  // updateStatus,
  // deleteOrder,
} from "../controllers/order.controller.js";
import { protect } from "../middleware/protect.js";
import checkIdempotency from "../middleware/idempotency.js";

const router = express.Router();

router.post("/create",[protect,checkIdempotency] ,create);
router.post("/verify-payment",protect,verifyOrder)
// router.get("/", read);
// router.get("/:id", readById);
// router.patch("/status/:id", updateStatus);
// router.delete("/:id", deleteOrder);

export default router;