import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productId: { type: Number, unique: true },
  title: String,
  description: String,
  unitPrice: Number,
  imgIndex: Number,
});

const Product = model("Product", productSchema);
export default Product;
