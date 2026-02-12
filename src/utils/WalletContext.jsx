import { ethers } from "ethers";
import erc20ABI from "./../abi/ERC20.json";
export const getWalletContext = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const selectedAccount = await signer.getAddress();

  const stakeUSDTContract = new ethers.Contract(
    import.meta.env.VITE_USDT_CONTRACT,
    erc20ABI,
    signer
  );

  return {
    signer,
    provider,
    selectedAccount,
    stakeUSDTContract,
    chainId: 56,
  };
};
