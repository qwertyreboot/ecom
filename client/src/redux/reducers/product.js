import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    getProductById: (state, action) => {
      const id = action.payload;
      console.log(id, state.products);
      const product = state.products?.find((product) => product._id === id);

      return product;
    },
  },
});

export const { setProducts, getProductById } = productSlice.actions;
export default productSlice.reducer;
