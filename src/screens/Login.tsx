import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "./Base";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import TextInput from "../components/TextInput";
import { signin } from "../Apicalls/Auth";

interface MyFormValues {
  email: string;
  password: string;
}
const validation = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(5, "Minimum length should be 5"),
});

const Login: React.FC = () => {
  const initialValues: MyFormValues = { email: "", password: "" };
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return <Redirect to="/" />;
  }
  return (
    <Base>
      <div className="login-container">
        <div className="heading-wrap">
          <h1 className="login-header">login</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values, actions) => {
            setError("");
            actions.setSubmitting(true);
            signin({ email: values.email, password: values.password })
              .then((data) => {
                if (!data.error) {
                  localStorage.setItem("user", JSON.stringify(data));
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
              <div style={{ color: "red", fontSize: "1rem" }}>
                {error ? error : ""}
              </div>
              <Form>
                <Field
                  placeholder="Email"
                  type="text"
                  name="email"
                  className={errors.email && touched.email ? "error" : ""}
                  as={TextInput}
                  values={values.email}
                />
                <div style={{ color: "red", fontSize: "1rem" }}>
                  {errors.email && touched.email ? errors.email : ""}
                </div>
                <Field
                  type="password"
                  placeholder="Password"
                  name="password"
                  className={errors.password && touched.password ? "error" : ""}
                  as={TextInput}
                  values={values.password}
                />
                <div style={{ color: "red" }}>
                  {errors.password && touched.password ? errors.password : ""}
                </div>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Loading" : "Login"}
                </button>
              </Form>
            </div>
          )}
        </Formik>
        <div className="signup-wrap">
          Don't have an account? <Link to="/signup">sign up</Link>
        </div>
      </div>
    </Base>
  );
};

export default Login;
