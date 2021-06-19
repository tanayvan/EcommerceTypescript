import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategoryAction } from "../actions/categoryAction";
import { getProductListAction } from "../actions/productListActions";
import ProductCardHome from "../components/ProductCardHome";
import Base from "./Base";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductListAction());
    dispatch(getCategoryAction());
  }, [dispatch]);
  return (
    <Base>
      <div className="home-card-container">
        <ProductCardHome
          url="https://images.unsplash.com/photo-1610419965999-ff462f0c27f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=358&q=80"
          title="Men"
        />
        <ProductCardHome
          url="https://images.unsplash.com/photo-1577381499541-966080080fa3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmFieSUyMGZhc2hpb258ZW58MHwxfDB8YmxhY2t8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          title="Kids"
        />
        <ProductCardHome
          url="https://images.unsplash.com/photo-1583604898860-306cd52731d1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfGJsYWNrfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          title="Women"
        />
      </div>
    </Base>
  );
};

export default Home;
