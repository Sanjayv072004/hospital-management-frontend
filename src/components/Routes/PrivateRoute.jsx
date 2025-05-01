import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log(" No Token - Redirecting to Login");
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;