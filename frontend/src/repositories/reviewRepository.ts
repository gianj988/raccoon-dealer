import { ReviewAdapter } from "../adapters/reviewAdapter";
import { ReviewPostData } from "../types";

const ReviewRepository = {
  getCustomerReviews: async function (customerId: string) {
    if (!customerId) {
      return [];
    }
    return await ReviewAdapter.get(`/customers/${customerId}/reviews`);
  },
  getProductReviews: async function (productId: string) {
    if (!productId) {
      return [];
    }
    return await ReviewAdapter.get(`/products/${productId}/reviews`);
  },
  addCustomerReview: async function (reviewData: ReviewPostData) {
    return await ReviewAdapter.post("/reviews", reviewData);
  },
};

export { ReviewRepository };
