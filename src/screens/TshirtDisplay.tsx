import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getCategoryAction } from "../actions/categoryAction";
import { getProductListAction } from "../actions/productListActions";
import { pcategory } from "../components/AddCategory";
import { product } from "../components/Addproduct";
import Layout from "../components/Layout";
import TshirtCard from "../components/TshirtCard";

const TshirtDisplay: React.FC = () => {
  const dispatch = useDispatch();
  const [priceSort, setPriceSort] = useState<string>("");
  const [catsort, setCatsort] = useState<string>("notselected");
  useEffect(() => {
    dispatch(getProductListAction());
    dispatch(getCategoryAction());
  }, [dispatch]);
  var { products } = useSelector((state: RootStateOrAny) => state.products);
  var { category, loading } = useSelector(
    (state: RootStateOrAny) => state.category
  );
  useEffect(() => {}, [priceSort, catsort, products]);
  if (loading && loading) {
    return (
      <Layout>
        <h1>Loading ...</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="tshirt-display-container">
        <h1>All Products</h1>
        <div className="input-container">
          <div className="sortby">
            <select
              name="price"
              id="price"
              onChange={(event) => {
                products.sort((a: any, b: any) =>
                  a.price > b.price ? 1 : b.price > a.price ? -1 : 0
                );
                if (event.target.value === "l2h") {
                  products.reverse();
                }
                setPriceSort(event.target.value);
              }}
            >
              <option value="" defaultValue="">
                Sort By
              </option>
              {/* <option>Sort By</option> */}
              <option value="l2h">Price -High to Low</option>
              <option value="h2l">Price -Low to High</option>
            </select>
          </div>
          <div className="sortby">
            <select
              name="cat"
              id="cat"
              onChange={(event) => {
                setCatsort(event.target.value);
              }}
            >
              <option value="notselected" defaultValue="" defaultChecked>
                All Category
              </option>
              {/* <option>Sort By</option> */}
              {category.map((cat: pcategory) => (
                <option value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="card-container">
          {products.map((product: product) => {
            console.log(catsort);

            if (catsort === product.category._id && catsort !== "notselected") {
              return (
                <>
                  <TshirtCard product={product} />
                </>
              );
            }
            if (catsort === "notselected") {
              return (
                <>
                  <TshirtCard product={product} />
                </>
              );
            }
            return [];
          })}
        </div>
      </div>
    </Layout>
  );
};

export default TshirtDisplay;
