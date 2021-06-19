import { Dispatch } from "react";
import { getUserCart } from "../Apicalls/Admin";
import {
  CART_LIST_FAIL,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
} from "../constants/cartListConstant";

const userData = JSON.parse(localStorage.getItem("user") || "null");

export const getCartAction = () => (dispatch: Dispatch<{}>) => {
  dispatch({ type: CART_LIST_REQUEST });

  getUserCart(userData.user._id, userData.token).then((data: any) => {
    console.log(data);

    if (!data.error) {
      dispatch({ type: CART_LIST_SUCCESS, payload: data });
      return;
    }
    dispatch({ type: CART_LIST_FAIL, payload: data.error });
  });
};
