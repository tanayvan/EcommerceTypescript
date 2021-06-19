import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import PrivateRoute from "./components/PrivateRoute";
import CartPage from "./screens/Cart";
import Home from "./screens/Home";
import Login from "./screens/Login";
import ProductPage from "./screens/ProductPage";
import Signup from "./screens/Signup";
import TshirtDisplay from "./screens/TshirtDisplay";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/tshirt/all" exact>
          <TshirtDisplay />
        </Route>
        <Route path="/admin" exact>
          <PrivateRoute />
        </Route>
        <Route path="/product/:id" exact>
          <ProductPage />
        </Route>
        <Route path="/cart" exact>
          <CartPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
