import { DB_NAME } from "../constant.js";
import mongoose from "mongoose";
import ApiError from "../utility/ApiError.js";
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    throw new ApiError(500, error.message) || process.exit(1);
  }
};

export default connectDB;
