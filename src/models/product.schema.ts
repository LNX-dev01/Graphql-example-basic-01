import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
  },
  { timestamps: true }
);

export const ProductModel = model("Product", productSchema);
