import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("token");

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
