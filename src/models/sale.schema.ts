import { Schema, model } from "mongoose";

const saleSchema = new Schema({
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
}, { timestamps: true });

export const SaleModel = model("Sale", saleSchema);
