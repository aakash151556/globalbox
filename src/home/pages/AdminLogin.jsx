import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./../../api/axios";
import { setToken } from "../../utils/JwtToken";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleWallet = async () => {
    if (!userid || !password) {
      alert("Enter UserId and Password");
      return;
    }

    try {
      setIsLoading(true);

      // STEP 1: LOGIN
      const loginRes = await api.post("/Home/Login", {
        userid,
        password,
        role: "admin",
        ip: "1",
      });

      if (!loginRes.data.status) {
        alert(loginRes.data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      // STEP 2: VERIFY OTP
      const otpRes = await api.post("/Home/VerifyOTP", {
        userid,
        password,
        role: "admin",
        ip: "1",
        otp: "999999", // replace with user input later
      });

      if (otpRes.data.status) {
        // Save token from OTP or Login response (depends on backend)
        const token = otpRes.data.token || loginRes.data.token;

        setToken(token);
        navigate("/admin/dashboard");
      } else {
        alert(otpRes.data.message || "OTP verification failed");
      }

    } catch (err) {
      console.error("Login failed:", err);
      alert("Server error, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-3 py-5">
      <div className="card">
        <div className="card-body pd-10">
          <div className="form-group">
            <label>User Id:</label>
            <input
              type="text"
              value={userid}
              className="form-control"
              placeholder="Enter User Id"
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="form-group mt-3">
            <label>Password:</label>
            <input
              type="password"
              value={password}              
              className="form-control"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="card-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleWallet}
            disabled={isLoading}
          >
            {isLoading ? "Connecting..." : "Login Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
