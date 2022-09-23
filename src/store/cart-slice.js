import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalCount: 0,
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

      state.totalCount--;
    },
  },
});

export const sendCartToFirebase = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Cart data !",
      })
    );

    const sendCartData = async () => {
      const response = await fetch(
        "https://redux-http-27f57-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Failed in sending cart data !");
      }
    };

    try {
      await sendCartData();
      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "Success",
          message: "Cart dat sent successfully !",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error, ",
          message: "Failed to send data !",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
