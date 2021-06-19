import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {} from "react-responsive";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
// import Swiper core and required modules

// install Swiper modules

// import Swiper core and required modules
import SwiperCore, { Lazy, Pagination, Navigation } from "swiper/core";
import { useDispatch } from "react-redux";
import { addToCart, getProduct } from "../Apicalls/Admin";
import { product } from "../components/Addproduct";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import Layout from "../components/Layout";
import { getCartAction } from "../actions/cartAction";

// install Swiper modules
SwiperCore.use([Lazy, Pagination, Navigation]);
const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<product>();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let { id } = useParams<{ id: string }>();
  const userData = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    console.log(id);
    getProduct(id)
      .then((data) => {
        console.log(data);
        if (!data.error) {
          setProduct(data);
          setLoading(false);
          return;
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // dispatch(getProductListAction());
  }, [dispatch, id]);

  // console.log(products[0]);

  const handleAddToCart = () => {
    addToCart(userData.user._id, userData.token, {
      products: [{ product: id, size: "M", quantity: 1 }],
    }).then((prod) => {
      console.log(prod);

      if (!prod.error) {
        dispatch(getCartAction());
      }
    });
  };
  if (loading) return <h1>Loading ...</h1>;
  return (
    <>
      <Layout>
        <div className="product-details-container">
          <div className="image-slider-container mySwiper">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true, dynamicBullets: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              {product?.photos.map((photo: string) => (
                <SwiperSlide className="swiper-slide">
                  <LazyLoadImage src={photo} width={"50%"} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="product-slider-container">
            <h1>{product?.name}</h1>
            <h2>{product?.price} ₹</h2>
            <Accordion className="accordion">
              <AccordionSummary
                expandIcon={<i className="fas fa-chevron-down"></i>}
              >
                <p>Description</p>
              </AccordionSummary>
              <AccordionDetails>{product?.description}</AccordionDetails>
            </Accordion>
            <button className="buy-button">Buy Now</button>
            <div className="button-container">
              <button className="cart-button" onClick={handleAddToCart}>
                Add To Cart
              </button>
              <button className="cart-button">Add To Wishlist</button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductPage;
