import { pcategory } from "../components/AddCategory";
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryConstants";

export const categoryListReducers = (
  state = { category: [] },
  action: {
    payload: pcategory;
    type: string;
  }
) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, category: [] };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, category: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
