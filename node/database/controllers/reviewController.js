import Review from "../models/review.js";

const ReviewController = {
  add(data) {
    const newReview = new Review(data);
    console.log("New review to be", newReview);
    return newReview.save();
  },
  deleteById(objectId) {
    return Review.findByIdAndDelete(objectId).exec();
  },
  getById(objectId) {
    return Review.findById(objectId).exec();
  },
  get(filters) {
    return Review.find(filters).exec();
  },
};

export default ReviewController;
