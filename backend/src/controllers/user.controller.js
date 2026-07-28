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
import {generateToken} from "../utils/helper.js";

const cryptr = new Cryptr(process.env.SECRET_KEY);

// 1. Register User
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return sendBadRequest(res);

    const user = await UserModel.findOne({ email: email });
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
      otpExpire,
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

    const user = await UserModel.findOne({ email: email });
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

    return sendSuccess(res, "OTP verified successfully");
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return sendServerError(res);
  }
};

// 3. Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return sendBadRequest(res, "Email and password are required");

    const user = await UserModel.findOne({ email });
    if (!user) return sendNotFound(res, "User not found");

    if (!user.isVerified) {
      return sendBadRequest(res, "Please verify your email/OTP first before logging in.");
    }

    const decryptedPass = cryptr.decrypt(user.password);
    if (decryptedPass !== password) {
      return sendBadRequest(res, "Invalid credentials");
    }
    const token = generateToken(user.id);// Generate JWT token for the user

    res.cookie('jwt', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,// Cookie is only accessible by the server
      secure: false,// Set to true if using HTTPS
      sameSite: 'strict',// Cookie will only be sent for same-site requests

    }
    )

    return sendSuccess(res, "Login successful");
  } catch (error) {
    console.error("Login Error:", error);
    return sendServerError(res);
  }
};

// Dummy / Placeholder Controllers
const read = async (req, res) => {
  try {
    console.log(req);
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

// Complete Export Object
export {
  register,
  VerifyOtp,
  login,
  read,
  readById,
  edit,
  deleteById,
  statusUpdate,
  updatePassword,
  updateProfile,
};