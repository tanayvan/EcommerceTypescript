import { useState } from "react";
import ProductForm from "./ProductForm";

export interface product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: { _id: string; name: string };
  photos: [string];
}

const AddNewProduct: React.FC = () => {
  const [open, setOpen] = useState(false);
  const initialValues = {
    name: "",
    category: "",
    description: "",
    price: 0,
    photo: [],
  };
  return (
    <div className="add-new-product">
      <h1>Products</h1>
      <div className="product-container">
        <button
          className="add-product-button"
          onClick={() => {
            setOpen(true);
          }}
        >
          <i className="fas fa-plus-circle" style={{ marginRight: "10px" }}></i>
          Add New Product
        </button>
      </div>
      {
        <ProductForm
          setopenProp={setOpen}
          open={open}
          initialValues={initialValues}
          isNew={true}
        />
      }
    </div>
  );
};

export default AddNewProduct;
