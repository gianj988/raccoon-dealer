import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  rating: Number,
  comment: String,
  date: Date,
});

reviewSchema.virtual("productInfo", {
  ref: "Product",
  localField: "product",
  foreignField: "_id",
  justOne: true,
});

reviewSchema.virtual("customerInfo", {
  ref: "Customer",
  localField: "customer",
  foreignField: "_id",
  justOne: true,
});

reviewSchema.methods.getResponseData = async function () {
  const reviewData = {
    customer: this.customer,
    product: this.product,
    rating: parseInt(this.rating),
    comment: this.comment,
    date: this.date,
  };
  await this.populate("productInfo");
  await this.populate("customerInfo");
  reviewData.product = this.productInfo;
  reviewData.customer = this.customerInfo;
  if (isNaN(reviewData.rating)) {
    reviewData.rating = 1;
  }
  return reviewData;
};

const Review = model("Review", reviewSchema);
export default Review;
