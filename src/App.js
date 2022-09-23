import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { sendCartToFirebase } from "./store/cart-actions";
import { fetchCartFromFirebase } from "./store/cart-actions";

// to avoid loading for the first time
let initialLoad = true;
function App() {
  const isCartVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (initialLoad) {
      initialLoad = false;
      dispatch(fetchCartFromFirebase());
      return;
    }
    /**
     * dispatch here takes action creator and passes dispatch as default to parameter function
     */
    dispatch(sendCartToFirebase(cart));
  }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
