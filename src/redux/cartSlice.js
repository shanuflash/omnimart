import { createSlice } from "@reduxjs/toolkit";

const initialState = ["test1", "test2"];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    empty: () => {
      return initialState;
    },
    add: (state, action) => {
      // state[action.payload.name] = action.payload.value;
    },
  },
});

export const { empty, change } = cartSlice.actions;

export default cartSlice.reducer;
