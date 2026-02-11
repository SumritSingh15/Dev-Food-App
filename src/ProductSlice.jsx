  import { createSlice } from "@reduxjs/toolkit";

  const ProductSlice = createSlice({
    name: "Product",
    initialState: {
      items: JSON.parse(localStorage.getItem("cart")) || [],
    },

    reducers: {
      addProduct: (state, action) => {
        const item = action.payload;
        const existing = state.items.find(i => i.id === item.id);

        if (existing) {
          existing.quantity += 1; // already exists → just increase
        } else {
          state.items.push({ ...item, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(state.items));

      },
      RemoveProduct: (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));

      },

      IncreaseQty: (state, action) => {
        const item = state.items.find(i => i.id === action.payload);
        if (item) item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.items));

      },

      DecreaseQty: (state, action) => {
        const item = state.items.find(i => i.id === action.payload);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        }
        else if (item && item.quantity === 1) {
          // auto remove if quantity becomes 0
          state.items = state.items.filter(i => i.id !== action.payload);
          localStorage.setItem("cart", JSON.stringify(state.items));

        }

      }
    }
  })
  export const { addProduct, RemoveProduct, DecreaseQty, IncreaseQty } = ProductSlice.actions;
  export default ProductSlice.reducer;