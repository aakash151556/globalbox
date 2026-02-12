// import { ethers } from "ethers";
// import erc20ABI from "./../abi/ERC20.json";

// export const connectWallet = async () => {
//   try {
//     if (!window.ethereum) {
//       alert("Please install MetaMask");
//       return null;
//     }

    
//     const accounts = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     });

//     if (!accounts || accounts.length === 0) {
//       alert("No wallet accounts found");
//       return null;
//     }

//     const selectedAccount = accounts[0];

    
//     const chainIdHex = await window.ethereum.request({
//       method: "eth_chainId",
//     });

//     const chainId = parseInt(chainIdHex, 16);

//     if (chainId !== 56) {
//       alert("Please switch to BSC Mainnet");
//       return null;
//     }

    
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const signer = await provider.getSigner();

    
//     const stakeUSDTContract = new ethers.Contract(
//       import.meta.env.VITE_USDT_CONTRACT,
//       erc20ABI,
//       signer
//     );

//     return {
//       signer,
//       provider,
//       selectedAccount,
//       stakeUSDTContract,
//       chainId,
//     };
//   } catch (error) {
//     console.error("connectWallet error:", error);
//     return null;
//   }
// };

import { ethers } from "ethers";
import erc20ABI from "./../abi/ERC20.json";
import stakingABI from "./../abi/StakingLogic.json";
import storageABI from "./../abi/Storage.json";
import bussinessABI from "./../abi/Bussiness.json";

const BSC_MAINNET = {
  chainId: "0x38", // 56,
  chainIdDec: 56, // 56
  chainName: "BNB Smart Chain",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: ["https://bsc-dataseed.binance.org/"],
  blockExplorerUrls: ["https://bscscan.com"],
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      alert("Please install MetaMask or Trust Wallet");
      return null;
    }
    const isTrustWallet =
  window.ethereum?.isTrust ||
  window.ethereum?.provider?.isTrust;


    // 1️⃣ Request wallet connection
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const selectedAccount = accounts[0];

    // 2️⃣ Check chain
    const chainIdHex = await window.ethereum.request({
      method: "eth_chainId",
    });

    // 3️⃣ Ask wallet to switch to BSC
    const flag=isTrustWallet?(chainIdHex !== BSC_MAINNET.chainIdDec):(chainIdHex !== BSC_MAINNET.chainId)

    if (chainIdHex!==BSC_MAINNET.chainIdDec && chainIdHex!==BSC_MAINNET.chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: BSC_MAINNET.chainId }],
        });
      } catch (error) {
        // Chain not added → add it
        if (error.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [BSC_MAINNET],
          });
        } else {
          alert("Network switch rejected");
          return null;
        }
      }
    }

    // 4️⃣ Provider & signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // 5️⃣ ERC20 contract (USDT BEP20)
    const usdtContract = new ethers.Contract(
      import.meta.env.VITE_USDT_CONTRACT,
      erc20ABI,
      signer
    );
  const tokenContract = new ethers.Contract(
      import.meta.env.VITE_TOKEN_CONTRACT,
      erc20ABI,
      signer
    );
       const stakingContract = new ethers.Contract(
      import.meta.env.VITE_TO_STAKING,
      stakingABI,
      signer
    );

     const storageContract = new ethers.Contract(
      import.meta.env.VITE_TO_STORAGE,
      storageABI,
      signer
    );
    const bussinessContract = new ethers.Contract(
      import.meta.env.VITE_TO_BUSSINESS,
      bussinessABI,
      signer
    );

    return {
      signer,
      provider,
      selectedAccount,
      usdtContract,
      tokenContract,
      stakingContract,
      storageContract,
      bussinessContract,
      chainId: 56,
    };
  } catch (err) {
    console.error("connectWallet error:", err);
    return null;
  }
};
