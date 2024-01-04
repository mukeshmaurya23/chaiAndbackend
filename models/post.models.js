import { Schema } from "mongoose";
import mongoose from "mongoose";
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
//in db it creates as posts --> plural form of model name and lowercase
