import mongoose from "mongoose";

async function connectDB() {
  try {
    const response = await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database is Connected");
  } catch (error) {
    console.error("MongoDB Connection Error Details:", error.message);
    process.exit(1);
  }
}

export default connectDB;