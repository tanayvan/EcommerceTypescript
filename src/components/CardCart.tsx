import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { product } from "./Addproduct";

const CartCard: React.FC<{ product: product; quantity: number }> = ({
  product,
  quantity,
}) => {
  const [quantityState, setQuantityState] = useState(quantity);
  console.log(product);

  return (
    <div className="cart-card">
      <div className="product-image">
        <LazyLoadImage src={product.photos[0]} width="75%" />
      </div>

      <div className="product-stats">
        <div className="product-name">{product.name}</div>
        <input
          type="number"
          style={{ width: "50%" }}
          onChange={(event: any) => {
            setQuantityState(event.target.value);
          }}
          value={quantityState}
        />
        <div
          className="product-price"
          style={{
            fontFamily: "Avant Garde Gothic",
          }}
        >
          {product.price}₹
        </div>
      </div>
    </div>
  );
};

export default CartCard;
