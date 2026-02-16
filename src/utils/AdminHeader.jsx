import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Collapse } from "bootstrap";

import Logo from "./../../public/logo.png";

import api from "../api/axios";

import { connectWallet } from "../utils/connectWallet";
import { isJwtValid, getWalletFromJwt } from "../utils/jwt";
import { getToken, setToken, clearToken } from "./JwtToken";

import Web3Context from "../Context/Web3Context";

const AdminHeader = () => {
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

 const handleLogout = () => {
    clearToken();
   

    closeMenu();
    navigate("/admin-login");
  };
const openPdf = () => {
  window.open("/plan.pdf", "_blank");
};

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <div className="container-fluid">

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
              <Link className="nav-link" to="#" onClick={openPdf}>
                Business Plan
              </Link>
            </li>
          </ul>

   
          <div className="d-flex align-items-center text-white">
           
              
                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm"
                >
                  Logout
                </button>
           
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
