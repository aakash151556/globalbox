import { ethers } from "ethers";
import erc20ABI from "./../abi/ERC20.json";

export const BSC_MAINNET = {
  chainId: "0x38",
  chainIdDec: 56,
  chainName: "BNB Smart Chain",
  nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  rpcUrls: ["https://bsc-dataseed.binance.org/"],
  blockExplorerUrls: ["https://bscscan.com"],
};

export const isTrustWallet =
  window.ethereum?.isTrust ||
  navigator.userAgent.toLowerCase().includes("trust");

/* -------- 1. Permission only (may reload in Trust Wallet) -------- */
export const requestWalletPermission = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts?.[0] || null;
};

/* -------- 2. Network enforcement -------- */
export const ensureBSC = async () => {
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  if (chainId === BSC_MAINNET.chainIdDec) return true;

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: BSC_MAINNET.chainId }],
    });
    return true;
  } catch (err) {
    if (err.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [BSC_MAINNET],
      });
      return true;
    }
    return false;
  }
};

/* -------- 3. Wallet context -------- */
export const getWalletContext = async () => {
   try{
   //const provider = new ethers.BrowserProvider(window.ethereum);
//    const signer = await provider.getSigner();
//    const address = await signer.getAddress();
 const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  // ✅ Trust Wallet compatible
  const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = await provider.getSigner();
   const address = await signer.getAddress();
  return { provider, signer, address };
   }
   catch(err){
    alert(err)
   }
  
};
