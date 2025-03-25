import { Schema, model } from "mongoose";

const orderStatusSchema = new Schema({
  title: String,
  statusId: { type: Number, unique: true },
});

const OrderStatus = model("OrderStatus", orderStatusSchema);
export default OrderStatus;
