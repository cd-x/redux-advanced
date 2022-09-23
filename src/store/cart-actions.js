import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartFromFirebase = () => {
  return async (dispatch) => {
    const fetchCartData = async () => {
      const response = await fetch(
        "https://redux-http-27f57-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    };

    try {
      const cartData = await fetchCartData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalCount: cartData.totalCount || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }
  };
};

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
