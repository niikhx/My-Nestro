import express from "express";
import {
  register,
  login,
  read,
  readById,
  edit,
  deleteById,
  statusUpdate,
  VerifyOtp,
  updatePassword,
  updateProfile,
} from "../controllers/user.controller.js";
// import { verify_otp } from "../controllers/user.controller.js";
// import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
// router.post("/verify-otp", verify_otp);
// router.get("/get-me", protect, getMe);
router.post("/verify-otp", VerifyOtp);
router.post("/login", login);
router.put("/edit/:id", edit);
router.put("/update-profile/:id", updateProfile);
router.put("/update-password/:id", updatePassword);
router.get("/", read);
router.get("/:id", readById);
// router.get("/logout", protect, logout)

router.delete("/delete/:id", deleteById);
router.patch("/status-update/:id", statusUpdate);

export default router;