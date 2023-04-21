import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    orderStart: (state) => {
      state.isFetching = true;
    },
    orderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
      state.error = false;
    },
    orderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { orderStart, orderSuccess, orderFailure } = orderSlice.actions;
export default orderSlice.reducer;
