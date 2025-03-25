import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Order, Product } from "../../types";

const initialState: {
  currentOrder: Order | null;
  currentCart: Array<Product>;
} = { currentOrder: null, currentCart: [] } as {
  currentOrder: Order | null;
  currentCart: Array<Product>;
};

const orderSlice = createSlice({
  name: "customerOrders",
  initialState,
  reducers: {
    setCurrentOrder(state, action: PayloadAction<Order | null>) {
      state = { ...state, currentOrder: action.payload };
      return state;
    },
    addToCart(state, action: PayloadAction<Product>) {
      let currentCart = state.currentCart;
      currentCart = currentCart.concat([action.payload]);
      state = { currentOrder: state.currentOrder, currentCart: currentCart };
      return state;
    },
    removeFromCart(state, action: PayloadAction<Product>) {
      let currentCart = state.currentCart;
      currentCart = currentCart.filter((p) => p._id !== action.payload._id);
      state = { currentOrder: state.currentOrder, currentCart: currentCart };
      return state;
    },
    emptyCart(state, action: PayloadAction<undefined | null>) {
      state = { currentOrder: state.currentOrder, currentCart: [] };
      return state;
    },
  },
});

export const { setCurrentOrder, addToCart, removeFromCart, emptyCart } =
  orderSlice.actions;

export default orderSlice.reducer;
