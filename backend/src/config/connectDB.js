import mongoose from "mongoose"

async function connectDB() {
  try {
    const response = await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database is Connected")
  } catch (error) {
    process.exit(1)
  }
}
  
export default connectDB;