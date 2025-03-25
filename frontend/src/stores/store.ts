import { configureStore } from "@reduxjs/toolkit";
// import type { Action } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/orderSlice";
import reviewReducer from "./slices/reviewSlice";

export const raccoonStore = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    customerReviews: reviewReducer,
    // qui vanno aggiunte le sezioni dello store, quindi per le reviews e per il currentOrder
  },
});

export type RaccoonStoreState = ReturnType<typeof raccoonStore.getState>;
export type RaccoonStore = typeof raccoonStore;
export type RaccoonStoreDispatch = typeof raccoonStore.dispatch;
