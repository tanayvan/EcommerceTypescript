import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { categoryListReducers } from "./reducers/categoryReducers";
import { productListReducers } from "./reducers/productListReducers";
import { cartListReducers } from "./reducers/cartReducers";

const reducer = combineReducers({
  category: categoryListReducers,
  products: productListReducers,
  cart: cartListReducers,
});
const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
