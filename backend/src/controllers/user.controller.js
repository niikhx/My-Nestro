import UserModel from "../models/user.model.js";
import CartModel from "../models/cart.model.js";
import OrderModel from "../models/order.model.js";
import {
  sendBadRequest,
  sendConflict,
  sendCreated,
  sendNotFound,
  sendServerError,
  sendSuccess,
} from "../utils/response.js";
import bcrypt from "bcryptjs";
import sendOtpMail from "../utils/otpmail.js";
import { generateToken } from "../utils/helper.js";


// 1. Register User
// Register User (Updated for Debugging)
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Request body check log
    console.log("Register Request Received Body:", req.body);

    if (!name || !email || !password) {
      console.log("Validation Failed: Missing Fields");
      return sendBadRequest(res, "Please fill all fields");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await UserModel.findOne({ email: normalizedEmail });

    if (user) {
      console.log("User already exists with email:", normalizedEmail);
      return sendConflict(res, "User already exists");
    }

    // Password Hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Exact 6 digits OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpire = Date.now() + 10 * 60 * 1000;

    // Send Mail (Isme error aane par catch me jayega)
    console.log("Attempting to send OTP email to:", normalizedEmail);
    await sendOtpMail(normalizedEmail, otp);

    // Save User
    await UserModel.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      otp,
      otpExpire,
    });

    console.log("User created successfully in database");
    return sendCreated(res, "User created successfully");
  } catch (error) {
    // Exact error terminal par log hoga
    console.error("REGISTER API ERROR DETAILS:", error);
    return sendServerError(res, error.message || "Internal Server Error");
  }
};

// 2. Verify OTP
const VerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return sendBadRequest(res);

    const user = await UserModel.findOne({ email: email.trim().toLowerCase() });
    if (!user) return sendNotFound(res, "User not found");

    if (user.otp !== Number(otp)) {
      return sendBadRequest(res, "Invalid OTP");
    }

    if (user.otpExpire < Date.now()) {
      return sendBadRequest(res, "OTP expired");
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    return sendSuccess(res, "OTP verified SuccessFully");
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return sendServerError(res);
  }
};

// 3. Login User
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return sendBadRequest(res);

    const user = await UserModel.findOne({ email: email.trim().toLowerCase() });
    if (!user) return sendNotFound(res, "Account not found");

    if (!user.isVerified) {
      return sendBadRequest(res, "Please verify OTP before signin");
    }

    // Compare Password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendBadRequest(res, "Invalid email or password");
    }

    const token = generateToken(user.id);

    // Set cookie with cross-origin support
    res.cookie('jwt', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: 'lax' // Cross-origin cookie passing ke liye lax use kiya hai
    });

    // Keep the current project role source readable for frontend route middleware.
    res.cookie('role', user.role, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
      sameSite: 'lax'
    });

    return sendSuccess(res, "login successfully", { user_id: user.id });

  } catch (error) {
    console.error("Signin Error:", error);
    return sendServerError(res);
  }
};

// adminLogin kept as unique handler in same file earlier section above.

// Dummy / Placeholder Controllers
const read = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    return sendSuccess(res, "Users fetched successfully", users);
  } catch (error) {
    return sendServerError(res);
  }
};

const readById = async (req, res) => {
  try {
    console.log(req);
  } catch (error) {
    return sendServerError(res);
  }
};

const edit = async (req, res) => {
  try {
    console.log(req);
  } catch (error) {
    return sendServerError(res);
  }
};

const deleteById = async (req, res) => {
  try {
    console.log(req);
  } catch (error) {
    return sendServerError(res);
  }
};

const statusUpdate = async (req, res) => {
  try {
    console.log(req);
  } catch (error) {
    return sendServerError(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    console.log(req);
  } catch (error) {
    return sendServerError(res);
  }
};

const updateProfile = async (req, res) => {
  try {
    console.log(req);
  } catch (error) {
    return sendServerError(res);
  }
};

const getProfile = async (req, res) => {
  const user = req.user || null;
  return res.status(200).json({
    message: "user find successfully",
    success: true,
    user
  });
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("role", {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logoutWithCredentials = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { email, password } = req.body;

    if (!loggedInUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    if (normalizedEmail !== String(loggedInUser.email).trim().toLowerCase()) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await UserModel.findById(loggedInUser._id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    await Promise.all([
      CartModel.deleteMany({ user_id: user._id }),
      OrderModel.deleteMany({ user_id: user._id }),
      UserModel.deleteOne({ _id: user._id }),
    ]);

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("role", {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Credential logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to logout",
    });
  }
};

const deleteAccountWithCredentials = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { email, password } = req.body;

    if (!loggedInUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    if (normalizedEmail !== String(loggedInUser.email).trim().toLowerCase()) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await UserModel.findById(loggedInUser._id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    await Promise.all([
      CartModel.deleteMany({ user_id: user._id }),
      OrderModel.deleteMany({ user_id: user._id }),
      UserModel.deleteOne({ _id: user._id }),
    ]);

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("role", {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Account delete successfully",
    });
  } catch (error) {
    console.error("Account deletion error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete account",
    });
  }
};

export {
  register,
  VerifyOtp,
  signin,
  read,
  readById,
  edit,
  deleteById,
  logout,
  logoutWithCredentials,
  deleteAccountWithCredentials,
  statusUpdate,
  getProfile,
  updatePassword,
  updateProfile,
};