import express from "express";
import { create, deleteById, read, readById, updateById, edit } from "../controllers/category.controller.js";
import upload from "../middleware/multer.js";
const router = express.Router()

router.get("/", read);
router.post("/create", upload.single("image"), create);
router.put("/edit/:id", upload.single("image"), edit);
router.delete("/delete/:id", deleteById);
router.patch("/status-update/:id", updateById);
router.get("/:id", readById);

export default router;

