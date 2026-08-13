import express from "express";
import { create, deleteById, read, readById, updateById, edit } from "../controllers/category.controller.js";
import { authorize, protect } from "../middleware/protect.js";
import upload from "../middleware/multer.js";
const router = express.Router()

router.get("/", protect, read);
router.post("/create", protect, authorize("admin", "superadmin"), upload.single("image"), create);
router.put("/edit/:id", protect, authorize("admin", "superadmin"), upload.single("image"), edit);
router.delete("/delete/:id", protect, authorize("admin", "superadmin"), deleteById);
router.patch("/status-update/:id", protect, authorize("admin", "superadmin"), updateById);
router.get("/:id", protect, readById);

export default router;

