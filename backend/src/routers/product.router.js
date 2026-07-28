import express from "express";
import { create, deleteById, read, statusUpdate, readById, addImages, statusById } from "../controllers/product.controller.js"

const router = express.Router();
import upload from "../middleware/multer.js";

router.post("/create", upload.single("image"), create)
router.get("/", read)
router.delete("/delete/:id", deleteById)
router.patch("/status-update/:id", statusUpdate)
router.get("/:id", readById);
router.post("/add-images/:id", upload.array("images", 4), addImages);
router.patch("/status/:id", statusById)

export default router;