import { Link } from "react-router-dom";
import { product } from "./Addproduct";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TshirtCard: React.FC<{ product: product }> = ({ product }) => {
  return (
    <div id="make-3D-space">
      <div id="product-card">
        <div id="product-front">
          <div className="shadow"></div>
          <LazyLoadImage
            src={product.photos[0]}
            alt=""
            effect="black-and-white"
            width="100%"
            height="100%"
          />
          <div className="image_overlay"></div>
          <Link to={`/product/${product._id}`} id="view_details">
            View details
          </Link>
          <div className="stats">
            <div className="stats-container">
              <span className="product_price">₹ {product.price} </span>
              <span className="product_name">{product.name}</span>
              {/* <p>{product.category}</p> */}

              <div className="product-options">
                <div className="strong">SIZES</div>
                <span>XS, S, M, L, XL, XXL</span>
                <div className="strong">COLORS</div>
                <div className="colors">
                  <div className="c-blue">
                    <span></span>
                  </div>
                  <div className="c-red">
                    <span></span>
                  </div>
                  <div className="c-white">
                    <span></span>
                  </div>
                  <div className="c-green">
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TshirtCard;
