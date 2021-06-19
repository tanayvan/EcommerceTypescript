import { Dispatch } from "react";
import { getAllCategories } from "../Apicalls/Admin";
import { pcategory } from "../components/AddCategory";
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryConstants";

export const getCategoryAction = () => (dispatch: Dispatch<{}>) => {
  dispatch({ type: CATEGORY_LIST_REQUEST });
  getAllCategories().then((data) => {
    if (!data.error) {
      let cArray: pcategory[] = [];
      data.forEach((category: any) => {
        cArray.push({ name: category.name, _id: category._id });
      });

      dispatch({ type: CATEGORY_LIST_SUCCESS, payload: cArray });
      console.log(cArray);
      return;
    }
    dispatch({ type: CATEGORY_LIST_FAIL, payload: data.error });
  });
};
