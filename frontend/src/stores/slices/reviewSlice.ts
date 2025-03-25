import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Review } from "../../types";

// Create an initial state value for the reducer, with that type
const initialState: Array<Review> = [];

// Create the slice and pass in the initial state
const customerReviews = createSlice({
  name: "customerReviews",
  initialState,
  reducers: {
    addReview(state, action: PayloadAction<Review>) {
      state.push(action.payload);
      return state;
    },
  },
});

// Export the auto-generated action creator with the same name
export const { addReview } = customerReviews.actions;

// Export the generated reducer function
export default customerReviews.reducer;
