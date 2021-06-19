import { product } from "./Addproduct";
import ProductCard from "./ProductCard";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductListAction } from "../actions/productListActions";

const UpdateProduct: React.FC = () => {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    dispatch(getProductListAction());
  }, [dispatch]);
  const productListSelector = useSelector(
    (state: RootStateOrAny) => state.products
  );

  const { loading, products, error } = productListSelector;

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="update-product-container">
      <h1>Update Product</h1>
      {error && <div color="red">{error}</div>}
      {products?.map((product: product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};

export default UpdateProduct;
