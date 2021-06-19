import { useState } from "react";
import Base from "./Base";
import AddNewProduct from "../components/Addproduct";
import UpdateProduct from "../components/UpdateProduct";
import AddCategory from "../components/AddCategory";
import UpdateCategory from "../components/UpdateCategory";
const AdminPage: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const changeValue = (x: number) => {
    setValue(x);
  };
  return (
    <Base>
      <div className="admin-container">
        <div className="admin-menu">
          <ul>
            <li
              className={value === 0 ? "active" : ""}
              onClick={() => {
                changeValue(0);
              }}
            >
              Products
            </li>
            <li
              className={value === 1 ? "active" : ""}
              onClick={() => {
                changeValue(1);
              }}
            >
              Update Product
            </li>
            <li
              className={value === 2 ? "active" : ""}
              onClick={() => {
                changeValue(2);
              }}
            >
              Category
            </li>
            <li
              className={value === 3 ? "active" : ""}
              onClick={() => {
                changeValue(3);
              }}
            >
              Orders
            </li>
          </ul>
        </div>
        <div className="menu-contents">
          {value === 0 && <AddNewProduct />}
          {value === 1 && <UpdateProduct />}
          {value === 2 && <AddCategory />}
          {value === 3 && <UpdateCategory />}
        </div>
      </div>
    </Base>
  );
};

export default AdminPage;
