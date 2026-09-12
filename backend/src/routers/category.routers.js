import express from "express";
import { create, deleteById, read, readById, updateById, edit } from "../controllers/category.controller.js";
import { authorize, protect } from "../middleware/protect.js";
import upload from "../middleware/multer.js";
const router = express.Router()

router.get("/", read);
router.post("/create", protect, authorize("superAdmin"), upload.single("image"), create);
router.put("/edit/:id", protect, authorize("superAdmin"), upload.single("image"), edit);
router.delete("/delete/:id", protect, authorize("superAdmin"), deleteById);
router.patch("/status-update/:id", protect, authorize("admin", "superAdmin"), updateById);
router.get("/:id", readById);

export default router;

