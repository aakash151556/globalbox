import { Navigate } from "react-router-dom";
import { connectWallet } from "./connectWallet";
import { useEffect, useState } from "react";
import { getToken, clearToken } from "../utils/JwtToken";
const AdminProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null); // null = loading
const token = getToken();



  useEffect(() => {

    if (!token) {
      setAuthorized(false);
      return;
    }

    setAuthorized(true);
  }, [token]);

  if (authorized === null) {
    return null;
  }

  if (!authorized) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminProtectedRoute;
