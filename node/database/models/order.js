import { Schema, model } from "mongoose";
import ProductController from "../controllers/productController.js";

const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }], //
  totalAmount: Number,
  orderDate: { type: Date, required: true },
  status: { type: Schema.Types.ObjectId, ref: "OrderStatus" },
});

orderSchema.virtual("extendedProducts", {
  ref: "Product",
  localField: "products",
  foreignField: "_id",
  justOne: false,
});

orderSchema.virtual("statusInfo", {
  ref: "OrderStatus",
  localField: "status",
  foreignField: "_id",
  justOne: true,
});

orderSchema.methods.getResponseData = async function () {
  const orderData = {
    customer: this.customer,
    products: this.products,
    totalAmount: this.totalAmount,
    orderDate: this.orderDate,
    status: this.status,
    _id: this._id,
  };
  await this.populate("extendedProducts");
  await this.populate("statusInfo");
  orderData.products = this.extendedProducts;
  orderData.status = this.statusInfo;
  return orderData;
};

const Order = model("Order", orderSchema);
export default Order;
