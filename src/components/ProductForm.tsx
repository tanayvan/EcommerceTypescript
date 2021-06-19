import Backdrop from "./Backdrop";
import { Formik, Form, Field } from "formik";
import TextInput from "./TextInput";
import * as yup from "yup";
import { useState } from "react";
import { createProduct, updateProduct } from "../Apicalls/Admin";
import { pcategory } from "./AddCategory";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getProductListAction } from "../actions/productListActions";
interface props {
  setopenProp: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  initialValues: any;
  isNew: boolean;
  id?: string;
}
const validation = yup.object({
  name: yup.string().required(),
  category: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
});

const ProductForm: React.FC<props> = ({
  setopenProp,
  open,
  initialValues,
  isNew = true,
  id,
}) => {
  const categorySelector = useSelector(
    (state: RootStateOrAny) => state.category
  );
  const dispatch = useDispatch();
  const { category } = categorySelector;
  const [file, setFile] = useState<any>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const userData = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <>
      {open && <Backdrop setopenProp={setopenProp}> </Backdrop>}
      <div
        className={
          open
            ? "product-form-container product-form-container-active"
            : "product-form-container"
        }
      >
        <div style={{ color: "green" }}>
          {success ? "Added Sucessfully" : " "}
        </div>
        <h1>Create Product</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, action) => {
            action.setSubmitting(true);
            const formData = new FormData();
            console.log(values);

            formData.set("name", values.name);
            formData.set("price", values.price.toString());
            formData.set("category", values.category);
            formData.set("description", values.description);
            file.forEach((file: any) => {
              formData.append("photo", file);
            });
            if (isNew === false) {
              updateProduct(userData.user._id, userData.token, formData, id)
                .then((data) => {
                  console.log(data);
                  if (!data.error) {
                    action.resetForm();
                    dispatch(getProductListAction());

                    setSuccess(true);
                    setTimeout(() => {
                      setSuccess(false);
                    }, 2000);
                    action.setSubmitting(false);
                    return;
                  }
                  action.setSubmitting(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              createProduct(userData.user._id, userData.token, formData)
                .then((data) => {
                  console.log(data);
                  if (!data.error) {
                    action.resetForm();
                    dispatch(getProductListAction());
                    setSuccess(true);
                    setTimeout(() => {
                      setSuccess(false);
                    }, 2000);
                    action.setSubmitting(false);
                    return;
                  }
                  action.setSubmitting(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }}
          validationSchema={validation}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <div className="form-container">
              <Form encType="multipart/form-data">
                <Field
                  placeholder="Name"
                  type="text"
                  name="name"
                  className={errors.name && touched.name ? "error" : ""}
                  as={TextInput}
                  values={values.name}
                />
                <div style={{ color: "red", fontSize: "1rem" }}>
                  {errors.name && touched.name ? errors.name : ""}
                </div>

                <Field
                  as="select"
                  name="category"
                  values={values.category}
                  placeholder="Select A Category"
                >
                  <option value="" defaultValue="" disabled hidden>
                    Choose here
                  </option>
                  {category.map((category: pcategory, index: number) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
                <div style={{ color: "red", fontSize: "1rem" }}>
                  {errors.category && touched.category ? errors.category : ""}
                </div>
                <Field
                  placeholder="Description"
                  type="text"
                  name="description"
                  className={
                    errors.description && touched.description ? "error" : ""
                  }
                  as={TextInput}
                  values={values.description}
                />
                <div style={{ color: "red", fontSize: "1rem" }}>
                  {errors.description && touched.description
                    ? errors.description
                    : ""}
                </div>
                <Field
                  placeholder="Price"
                  type="number"
                  name="price"
                  className={errors.price && touched.price ? "error" : ""}
                  as={TextInput}
                  values={values.price}
                />
                <div style={{ color: "red", fontSize: "1rem" }}>
                  {errors.price && touched.price ? errors.price : ""}
                </div>
                <input
                  placeholder="File"
                  type="file"
                  name="photo"
                  accept="image/*"
                  multiple
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files !== null) {
                      console.log(event.target.files);
                      const fileListAsArray = Array.from(event.target.files);
                      console.log(fileListAsArray);

                      setFile([...fileListAsArray]);
                    }
                  }}
                />
                <div style={{ color: "red", fontSize: "1rem" }}>
                  {errors.price && touched.price ? errors.price : ""}
                </div>
                <button type="submit" disabled={isSubmitting}>
                  {isNew ? "Add Product" : "Update Product"}
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ProductForm;
