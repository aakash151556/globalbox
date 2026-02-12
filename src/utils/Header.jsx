import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Collapse } from "bootstrap";

import Logo from "./../../public/logo.png";
import api from "../api/axios";

import { connectWallet } from "../utils/connectWallet";
import { isJwtValid, getWalletFromJwt } from "../utils/jwt";
import { getToken, setToken, clearToken } from "./JwtToken";

import Web3Context from "../context/Web3Context";

const Header = () => {
  const navigate = useNavigate();
  const { wallet, setWallet } = useContext(Web3Context);

  const [walletAddress, setWalletAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const collapseRef = useRef(null);
  const collapseInstance = useRef(null);

  /* -------------------- RESTORE SESSION (NO WALLET CONNECT) -------------------- */
  useEffect(() => {
    if (!isJwtValid()) return;
    const restore = async () => {
      const walletData = await connectWallet();
      if (!walletData) return;

      setWallet(walletData);
      setWalletAddress(walletData.selectedAccount);
    };

    restore();
  }, []);

  /* -------------------- NAVBAR CONTROLS -------------------- */
  const toggleMenu = () => {
    if (!collapseInstance.current) {
      collapseInstance.current = new Collapse(collapseRef.current, {
        toggle: false,
      });
    }
    collapseInstance.current.toggle();
  };

  const closeMenu = () => {
    collapseInstance.current?.hide();
  };

  /* -------------------- WALLET LOGIN -------------------- */
  const handleWalletLogin = async () => {
    try {
      setIsLoading(true);

      if (isJwtValid()) {
        navigate("/user/dashboard");
        return;
      }

      const walletData = await connectWallet();
      if (!walletData) return;

      const nonceRes = await api.get(
        `/home/auth/nonce/${walletData.selectedAccount}`
      );
      const nonce = nonceRes.data.nonce;
      const signature = await walletData.signer.signMessage(
        `Login nonce: ${nonce}`
      );

      const payload = {
        WalletAddress: walletData.selectedAccount,
        Signature: signature, // add later if required
        Nonce: nonce,
        referralCode: "",
      };

      const res = await api.post("/home/auth/verify", payload);

      if (res?.data?.token) {
        setToken(res.data.token);
        setWallet(walletData);
        setWalletAddress(walletData.selectedAccount);
        navigate("/user/dashboard");
      }
    } catch (err) {
      console.error("Wallet login failed:", err);
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- LOGOUT -------------------- */
  const handleLogout = () => {
    clearToken();
    localStorage.removeItem("wallet");

    setWallet(null);
    setWalletAddress(null);

    closeMenu();
    navigate("/");
  };

  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : null;

  /* -------------------- JSX -------------------- */
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <div className="container-fluid">
        {/* LOGO */}
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <img src={Logo} alt="Logo" style={{ width: "60px" }} />
        </Link>

        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon" />
        </button>

        <div ref={collapseRef} className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to={walletAddress ? "/user/dashboard" : "/"}
                onClick={closeMenu}
              >
                {walletAddress ? "Dashboard" : "Home"}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeMenu}>
                About Us
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={closeMenu}>
                Contact Us
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/plan" onClick={closeMenu}>
                Business Plan
              </Link>
            </li>
          </ul>

          {/* RIGHT SIDE */}
          <div className="d-flex align-items-center text-white">
            {walletAddress ? (
              <>
                <span className="badge bg-success px-3 py-2">
                  {shortAddress}
                </span>
                &nbsp;
                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleWalletLogin}
                className="btn btn-success btn-sm"
                disabled={isLoading}
              >
                {isLoading ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
