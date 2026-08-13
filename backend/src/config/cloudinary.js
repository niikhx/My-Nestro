import dotenv from "dotenv";// .env se variable ko load karne ke liye dotenv package ka use krte hai
dotenv.config();// .env file ko load karne ke liye config() method ka use karte hai
import { v2 as cloudinary } from "cloudinary";// cloudinary package ko import karte hai
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
export default cloudinary;