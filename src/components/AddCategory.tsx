import { Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import TextInput from "./TextInput";
import * as yup from "yup";
import { createCategory, deleteCategory } from "../Apicalls/Admin";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getCategoryAction } from "../actions/categoryAction";
export interface pcategory {
  _id: string;
  name: string;
}
const AddCategory: React.FC = () => {
  interface MyFormValues {
    name: string;
  }
  const validation = yup.object({
    name: yup.string().required(),
  });
  const dispatch = useDispatch();
  const initialValues: MyFormValues = { name: "" };
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleted, setDeleted] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user") || "null");
  const categorySelector = useSelector(
    (state: RootStateOrAny) => state.category
  );
  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);
  const { category, loading, error } = categorySelector;

  const handleDelete = (id: string) => {
    deleteCategory(userData.user._id, userData.token, id).then((data) => {
      if (!data.error) {
        setDeleted(true);
        setTimeout(() => {
          setDeleted(false);
        }, 2000);
        dispatch(getCategoryAction());
      }
      setErrorMessage(error);
    });
  };
  if (loading === true) {
    return <h1 className="category-container">loading ...</h1>;
  }
  return (
    <div className="category-container">
      <h1>Categories</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={(values, action) => {
          createCategory(userData.user._id, userData.token, {
            name: values.name,
          }).then((data) => {
            action.setSubmitting(true);
            setErrorMessage("");
            if (!data.error) {
              setErrorMessage("");
              action.setSubmitting(false);
              action.resetForm();
              setSuccess(true);
              dispatch(getCategoryAction());

              setTimeout(() => {
                setSuccess(false);
              }, 2000);
              return;
            }
            setErrorMessage(data.error);
            action.setSubmitting(false);
            console.log(data);
          });
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <div
              style={{
                color: "red",
                fontSize: "1rem",
                height: "15px",
                margin: "5px 0",
              }}
            >
              {error ? errorMessage : " "}
            </div>
            <p
              style={{
                color: "green",
                fontSize: "1rem",
                height: "15px",
                margin: "5px 0",
              }}
            >
              {success ? "Category saved sucessfully" : " "}
            </p>
            <Field
              placeholder="Category"
              type="text"
              name="name"
              values={values.name}
              className={errors.name && touched.name ? "error" : ""}
              as={TextInput}
            />
            <div style={{ color: "red", fontSize: "1rem" }}>
              {errors.name && touched.name ? errors.name : ""}
            </div>
            <button type="submit" disabled={isSubmitting}>
              Add{" "}
            </button>
          </Form>
        )}
      </Formik>
      <div className="category-list-container">
        <h1>All Category</h1>
        <div
          style={{
            color: "red",
            fontSize: "1rem",
            textAlign: "center",
            height: "15px",
            margin: "5px 0",
          }}
        >
          {deleted ? "Category Deleted" : ""}
        </div>
        <ul>
          {category.map((cate: pcategory) => (
            <li key={cate._id}>
              <div>{cate.name}</div>
              <i
                className="fas fa-trash-alt"
                onClick={() => {
                  handleDelete(cate._id);
                }}
              ></i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCategory;
