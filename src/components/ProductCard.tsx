import { useState } from "react";
import { DeleteProduct, getAllProducts } from "../Apicalls/Admin";
import { product } from "../components/Addproduct";
import ProductForm from "./ProductForm";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { getProductListAction } from "../actions/productListActions";

interface props {
  product: product;
}
const ProductCard: React.FC<props> = ({ product }) => {
  const initialValues = {
    name: product.name,
    category: product.category._id,
    description: product.description,
    price: product.price,
    photo: [],
  };
  const [open, setOpen] = useState<boolean>(false);
  const userData = JSON.parse(localStorage.getItem("user") || "null");
  const dispatch = useDispatch();
  const handleDelete = () => {
    DeleteProduct(userData.user._id, userData.token, product._id).then(
      (data) => {
        if (!data.error) {
          getAllProducts().then((data) => {
            console.log(data);

            if (!data.error) {
              dispatch(getProductListAction());
            }
          });
        }
      }
    );
  };
  return (
    <div className="product-card">
      <div className="container">
        <LazyLoadImage
          src={product.photos[0]}
          alt=""
          style={{ width: "20%" }}
          effect="blur"
        />
        <div className="name">{product.name}</div>
      </div>
      <div className="icon-container">
        <i
          className="fas fa-pen"
          onClick={() => {
            setOpen(true);
          }}
        ></i>
        <i className="fas fa-trash" onClick={handleDelete}></i>
      </div>
      <ProductForm
        initialValues={initialValues}
        isNew={false}
        setopenProp={setOpen}
        open={open}
        id={product._id}
      />
    </div>
  );
};

export default ProductCard;
