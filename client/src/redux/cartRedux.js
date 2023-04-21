import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    address: "",
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.SFIYAT * action.payload.quantity;
    },
    removeFromCart: (state, action) => {
      state.quantity -= 1;
      state.products.splice(action.payload[1] - 1, 1);
      state.total -= action.payload[0].SFIYAT * action.payload[0].quantity;
    },
    emptyCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    updateProductQuantity: (state, action) => {
      state.products[action.payload.index] = {
        ...state.products[action.payload.index],
        quantity: action.payload.newQuantity,
      };
      state.total = 0;
      state.products.forEach((product) => {
        state.total += product.SFIYAT * product.quantity;
      });
    },
    addAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const {
  addProduct,
  emptyCart,
  removeFromCart,
  updateProductQuantity,
  addAddress,
  removeAddress,
} = cartSlice.actions;
export default cartSlice.reducer;
