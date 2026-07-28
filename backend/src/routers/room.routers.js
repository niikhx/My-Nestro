import express from "express";
import { create, deleteById, read, readById, updateById, edit } from "../controllers/room.controller.js";
const router = express.Router()

router.get("/", read);
router.post("/create", create);
router.put("/edit/:id", edit);
router.delete("/delete/:id", deleteById);
router.patch("/status-update/:id", updateById);
router.get("/:id", readById);

export default router;

