import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const item = state.items.find((item) => item.product === product);

      if (item) {
        item.quantity += quantity;
        return;
      }

      state.items.push({ product, quantity });
    },
    removeFromCart: (state, action) => {
      const { product, quantity } = action.payload;
      const index = state.items.findIndex((item) => item.product === product);

      if (index !== -1) {
        state.items[index].quantity -= quantity;

        if (state.items[index].quantity <= 0) {
          state.items.splice(index, 1);
        }
      }
    },
    clearFromCart: (state, action) => {
      const { product } = action.payload;
      const index = state.items.findIndex((item) => item.product === product);

      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addToCart, clearFromCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
