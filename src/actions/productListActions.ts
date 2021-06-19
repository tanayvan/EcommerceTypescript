import { Dispatch } from "react";
import { getAllProducts } from "../Apicalls/Admin";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productListConstants";

export const getProductListAction = () => (dispatch: Dispatch<{}>) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  getAllProducts().then((data) => {
    console.log(data);

    if (!data.error) {
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
      return;
    }
    dispatch({ type: PRODUCT_LIST_FAIL, payload: data.error });
  });
};
