import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Context from "../Context/Web3Context";
import { connectWallet } from "./connectWallet";




const Web3Provider = ({ children }) => {
  const [wallet, setWallet] = useState(null);


  return (
    <Web3Context.Provider value={{ wallet, setWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
