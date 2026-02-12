import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "./../../api/axios";
import { connectWallet } from "./../../utils/connectWallet";
import { useContext } from "react";

import { getToken, setToken } from "../../utils/JwtToken";
import Web3Context from "../../context/Web3Context";

const Register = () => {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref");
    const { wallet, setWallet } = useContext(Web3Context);
  
  const navigate = useNavigate();



  const [isLoading, setIsLoading] = useState(false);

  const handleWallet = async () => {
    try {
      setIsLoading(true);
      const walletData = await connectWallet();
      if (!walletData) return;
      const nonceRes = await api.get(
        `/home/auth/nonce/${walletData.selectedAccount}`
      );
      const nonce = nonceRes.data.nonce;
      const signature = await walletData.signer.signMessage(
        `Login nonce: ${nonce}`
      );

      const obj = {
        WalletAddress: walletData.selectedAccount,
        Signature: signature,
        Nonce: nonce,
        ReferralCode: referralCode,
      };

   

      const res = await api.post("/home/auth/verify", obj);
        if (res?.data?.token) {
              setToken(res.data.token);
      
              setWallet(walletData);
              
      
              navigate("/user/dashboard");
            }
    } catch (err) {
      setIsLoading(false);
      console.error("Wallet login failed:", err);
    }
  };

  return (
    <>
      <div className="container mt-3 py-5">
        <div className="card">
          <div className="card-body  pd-10">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Your Referral Code:</label>
                  <input
                    type="text"
                    value={referralCode}
                    className="form-control"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleWallet}
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Connect Wallet & Register Now"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
