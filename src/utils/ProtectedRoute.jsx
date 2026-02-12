import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken, clearToken } from "../utils/JwtToken";
import { getWalletFromJwt } from "./jwt";
import api from "../api/axios";

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  const [authorized, setAuthorized] = useState(null); // null = loading

  useEffect(() => {
    const validateUser = async () => {
      try {
        if (!token) {
          setAuthorized(false);
          return;
        }

        const selectedAccount = getWalletFromJwt();

        const obj = {
          obj: { account: selectedAccount },
          apiname: "GetUsers",
        };

        const res = await api.post("/DynamicAPI/dynamic-request", obj);

        if (res.data.status && res.data.data.length > 0) {
          setAuthorized(true);
        } else {
          clearToken();
          setAuthorized(false);
        }
      } catch (err) {
        clearToken();
        setAuthorized(false);
      }
    };

    validateUser();
  }, [token]);

  // 🔄 Loading state
  if (authorized === null) {
    return null; // or loader/spinner
  }

  // 🚫 Not authorized
  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized
  return children;
};

export default ProtectedRoute;
