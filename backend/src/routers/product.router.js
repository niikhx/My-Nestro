import express from "express";
import { create, deleteById, read, statusUpdate, readById, addImages, statusById } from "../controllers/product.controller.js"
import { authorize, protect } from "../middleware/protect.js";

const router = express.Router();
import upload from "../middleware/multer.js";

router.post("/create", protect, authorize("superAdmin"), upload.single("image"), create)
router.get("/", read)
router.delete("/delete/:id", protect, authorize("superAdmin"), deleteById)
router.patch("/status-update/:id", protect, authorize("admin", "superAdmin"), statusUpdate)
router.get("/:id", readById);
router.post("/add-images/:id", protect, authorize("superAdmin"), upload.array("images", 4), addImages);
router.patch("/status/:id", protect, authorize("admin", "superAdmin"), statusById)

export default router;