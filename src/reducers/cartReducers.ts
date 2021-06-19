import { product } from "../components/Addproduct";
import {
  CART_LIST_FAIL,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
} from "../constants/cartListConstant";

export const cartListReducers = (
  state = { cart: { products: [] }, loading: true },
  action: {
    payload: [product];
    type: string;
  }
) => {
  switch (action.type) {
    case CART_LIST_REQUEST:
      return { loading: true, cart: { products: [] } };
    case CART_LIST_SUCCESS:
      return { loading: false, cart: action.payload };
    case CART_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
