import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getCartAction } from "../actions/cartAction";
import CartCard from "../components/CardCart";
import Layout from "../components/Layout";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("hello");
    dispatch(getCartAction());
  }, [dispatch]);

  const { loading, cart } = useSelector((state: RootStateOrAny) => state.cart);
  if (loading) {
    return <h1>loading ...</h1>;
  }
  console.log(cart);

  return (
    <Layout>
      <h1>Your Cart</h1>
      <div className="cart-container">
        <div className="products">
          <div className="" style={{ fontSize: "2rem", textAlign: "center" }}>
            Products
          </div>
          {cart.products.map((cart: any) => (
            <CartCard product={cart.product} quantity={cart.quantity} />
          ))}
        </div>
        <div className="checkout-container">
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              fontSize: "1.3rem",
            }}
          >
            <div>Your Subtotal is </div>
            <div>10 </div>
          </div>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
