import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalCount: 0,
    updated: false,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existing = state.items.find((item) => item.id === newItem.id);
      if (existing) {
        existing.quantity++;
        existing.totalPrice += newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      }
      state.updated = true;
      state.totalCount++;
    },
    removeItemFromCart(state, action) {
      const { id } = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (existing.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existing.quantity -= 1;
        existing.totalPrice -= existing.price;
      }
      state.updated = true;
      state.totalCount--;
    },

    replaceCart(state, action) {
      state.totalCount = action.payload.totalCount;
      state.items = action.payload.items;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
