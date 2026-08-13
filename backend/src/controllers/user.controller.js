import UserModel from "../models/user.model.js";
import {
  sendBadRequest,
  sendConflict,
  sendCreated,
  sendNotFound,
  sendServerError,
  sendSuccess,
} from "../utils/response.js";
import Cryptr from "cryptr";
import sendOtpMail from "../utils/otpmail.js";
import { generateToken } from "../utils/helper.js";

const cryptr = new Cryptr(process.env.SECRET_KEY);

// 1. Register User
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return sendBadRequest(res);
    const user = await UserModel.findOne({ email });
    if (user) return sendConflict(res, "User already exists");
    const encrypted_Password = cryptr.encrypt(password);

    // Exact 6 digits OTP: 100000 - 999999
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await sendOtpMail(email, otp);
    await UserModel.create({
      name,
      email,
      password: encrypted_Password,
      otp,
      otpExpire
    });

    return sendCreated(res, "User created successfully");
  } catch (error) {
    console.error("Register Error:", error);
    return sendServerError(res);
  }
};

// 2. Verify OTP
const VerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return sendBadRequest(res);

    const user = await UserModel.findOne({ email });
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
    const user = await UserModel.findOne({ email });
    if (!user) return sendNotFound(res, "Accound already exist")
    const decryptedPass = cryptr.decrypt(user.password);
    if (decryptedPass != password) {
      return sendBadRequest(res)
    }
    const token = generateToken(user.id)

    res.cookie('jwt', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,       // Expiration time in milliseconds (15 minutes)
      httpOnly: true,       // Prevents client-side JS from reading the cookie (protects against XSS)
      secure: false,         // Ensures cookie is only sent over HTTPS connections
      sameSite: 'strict'    // Controls cross-site request behavior ('strict', 'lax', or 'none')
    });
    return sendSuccess(res, "login successfully",
      {user_id: user.id}
    )

  } catch (error) {
    return sendServerError(res)
  }
}

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
      sameSite: "strict",
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


// Complete Export Object
export {
  register,
  VerifyOtp,
  signin,
  read,
  readById,
  edit,
  deleteById,
  logout,
  statusUpdate,
  getProfile,
  updatePassword,
  updateProfile,
};