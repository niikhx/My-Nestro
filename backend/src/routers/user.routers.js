import express from "express";
import {
  register,
  signin,
  read,
  readById,
  edit,
  deleteById,
  statusUpdate,
  VerifyOtp,
  logout,
  updatePassword,
  updateProfile,
  getProfile
} from "../controllers/user.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", VerifyOtp);
router.get("/get-profile", protect, getProfile);
router.post("/signin", signin);
router.put("/edit/:id", edit);
router.put("/update-profile/:id", updateProfile);
router.put("/update-password/:id", updatePassword);
router.get("/", read);
router.get("/:id", readById);
router.get("/logout", protect, logout)
router.delete("/delete/:id", deleteById);
router.patch("/status-update/:id", statusUpdate);

export default router;