import userModel from "../models/user.model.js";
import { sendServerError } from "../utils/response.js";
import jwt, { decode } from "jsonwebtoken";
async function protect(req, res, next) {
  try {
    let token = null;
    // console.log(req.cookies)
    if (req.cookies && req.cookies.jwt) {// agar cookies me jwt token hai to
      token = req.cookies.jwt// agar cookies me jwt token hai to usko token variable me store kar raha hai
    }

    if (!token && req.headers.authorization) {
      token = req.headers.authorization
    }

    if (token == null) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false
      });// agar token null hai to unauthorized error return kar raha hai
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);// token ko verify kar raha hai
    const user = await userModel.findById(decoded.id).select("-password");// sabhi user ki information le raha hai except password
    req.user = user;// user ko req object me attach kar diya 

    next();
  }
  catch (error) {
    return sendServerError(res);
  }
};


const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden",
        success: false
      });
    }
    next();
  };
};

export { protect, authorize };