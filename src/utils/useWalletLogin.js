import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { isJwtValid, getWalletFromJwt } from "../utils/jwt";
import {
  isTrustWallet,
  requestWalletPermission,
  ensureBSC,
  getWalletContext,
} from "../utils/wallet";
import { setToken } from "../utils/JwtToken";
import Web3Context from "../Context/Web3Context";

export const useWalletLogin = () => {
  const [loading, setLoading] = useState(false);
  const context=useContext(Web3Context)

  /* ---- Resume Trust Wallet login after reload ---- */
  useEffect(() => {
    if (!isJwtValid()) return; 
    loginAfterPermission();
  }, []);

  const loginAfterPermission = async () => {
    const ok = await ensureBSC();
    if (!ok) return;

    const wallet = await getWalletContext();
    await signatureLogin(wallet);
  };

  const signatureLogin = async ({ signer, address }) => {
    // 1️⃣ get nonce from backend
    const nonceRes = await api.get(`/home/auth/nonce/${address}`);
    const nonce = nonceRes.data.nonce;

    // 2️⃣ sign nonce
    const signature = await signer.signMessage(
      `Login nonce: ${nonce}`
    );

    // 3️⃣ verify & get JWT
    const res = await api.post("/home/auth/verify", {
      walletAddress: address,
      signature,
      nonce,
      referralCode:"0"
    });

    if (res?.data?.token) {
      setToken(res.data.token);
      sessionStorage.setItem("wallet", address);
      
      window.location.href = "/user/dashboard";
    }
  };

  /* ---- Public function ---- */
  const connectAndLogin = async () => {
    setLoading(true);

    try {
    
      const account = await requestWalletPermission();
      if (!account) return;

      const ok = await ensureBSC();
      if (!ok) return;

      const wallet = await getWalletContext();
      await signatureLogin(wallet);
    } finally {
      setLoading(false);
    }
  };

  return { connectAndLogin, loading };
};
