import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINAY_API_SECRET,
});

const uploadToCloudinary = async (file) => {
  try {
    if (!file) throw new ApiError(400, "No file found");
    const response = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    console.log(response);
    fs.unlinkSync(file);
    return response?.url;
  } catch (error) {
    fs.unlinkSync(file);
    throw new ApiError(500, error.message);
  }
};

export { uploadToCloudinary };
