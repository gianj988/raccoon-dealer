import { Schema, model } from "mongoose";
import Review from "./review.js";
import Order from "./order.js";
import { getStringRequiredValidator } from "../validators/validators.js";

const customerSchema = new Schema({
  customerName: {
    type: String,
    validate: {
      validator: getStringRequiredValidator(false),
      message: (props) => "A name is required.",
    },
    required: true,
  },
  username: {
    type: String,
    unique: true,
    validate: {
      validator: getStringRequiredValidator(false),
      message: (props) => "A username is required.",
    },
    required: true,
  },
  password: {
    type: String,
    validate: {
      validator: getStringRequiredValidator(false),
      message: (props) => "A password is required.",
    },
    required: true,
  },
  email: String,
});

customerSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "customer",
});

customerSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "customer",
});

customerSchema.pre("remove", async function (next) {
  const user = this;
  await Review.deleteMany({ customer: user._id });
  await Order.deleteMany({ customer: user._id });
  next();
});

const Customer = model("Customer", customerSchema);
export default Customer;
