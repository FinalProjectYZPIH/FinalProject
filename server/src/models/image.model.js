import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    data: {type: Buffer, required: true},
    contentType: {type: String, required: true},
  },
  {
    timestamps: {
        createdAt: true
    },
  }
);

const ImageModel = mongoose.model("Image", ImageSchema, "Images");

export default ImageModel;
