import { useState } from "react";
import { Redirect, Route } from "react-router";
import AdminPage from "../screens/AdminPage";

const PrivateRoute: React.FC = () => {
  const [userData] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  if (userData === null) {
    return <Redirect to="/" />;
  }
  return (
    <Route>
      <AdminPage />
    </Route>
  );
};
export default PrivateRoute;
