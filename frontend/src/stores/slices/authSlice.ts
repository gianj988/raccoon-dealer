import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types";

// Create an initial state value for the reducer, with that type
const initialState: { user: User | null } = { user: null } as {
  user: User | null;
};

// Create the slice and pass in the initial state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeLoggedUser(state, action: PayloadAction<User | null>) {
      state = { user: action.payload };
      return state;
    },
  },
});

// Export the auto-generated action creator with the same name
export const { changeLoggedUser } = authSlice.actions;

// Export the generated reducer function
export default authSlice.reducer;
