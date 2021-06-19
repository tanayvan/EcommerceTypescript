import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "./Base";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import TextInput from "../components/TextInput";
import { signup } from "../Apicalls/Auth";

interface MyFormValues {
  email: string;
  password: string;
  name: string;
}
const validation = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(5, "Minimum length should be 5"),
  name: yup.string().required().min(5),
});

const Login: React.FC = () => {
  const initialValues: MyFormValues = { email: "", password: "", name: "" };
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return <Redirect to="/login" />;
  }
  return (
    <Base>
      <div className="login-container ">
        <div className="heading-wrap">
          <h1 className="login-header">Sign Up</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values, actions) => {
            setError("");
            actions.setSubmitting(true);
            signup({
              email: values.email,
              password: values.password,
              name: values.name,
            })
              .then((data) => {
                if (!data.error) {
                  setError("");
                  setIsSuccess(true);
                  return;
                }
                setError(data.error);
                console.log(data);
              })
              .catch((err) => {
                console.log(err);
              });

            actions.setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            isSubmitting,
          }) => (
            <div className="input-wrap">
              <div style={{ color: "red" }}>{error ? error : ""}</div>
              <Form>
                <Field
                  placeholder="Name"
                  type="text"
                  name="name"
                  className={errors.name && touched.name ? "error" : ""}
                  as={TextInput}
                />
                <div style={{ color: "red" }}>
                  {errors.name && touched.name ? errors.name : ""}
                </div>
                <Field
                  placeholder="Email"
                  type="text"
                  name="email"
                  className={errors.email && touched.email ? "error" : ""}
                  as={TextInput}
                />
                <div style={{ color: "red" }}>
                  {errors.email && touched.email ? errors.email : ""}
                </div>
                <Field
                  type="password"
                  placeholder="Password"
                  name="password"
                  className={errors.password && touched.password ? "error" : ""}
                  as={TextInput}
                />
                <div style={{ color: "red" }}>
                  {errors.password && touched.password ? errors.password : ""}
                </div>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Loading" : "Sign Up"}
                </button>
              </Form>
            </div>
          )}
        </Formik>
        <div className="signup-wrap">
          Don't have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </Base>
  );
};

export default Login;
