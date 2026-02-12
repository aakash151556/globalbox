export const ensureBSCNetwork = async () => {
  const chainIdHex = await window.ethereum.request({
    method: "eth_chainId",
  });

  if (chainIdHex === BSC_MAINNET.chainId) return true;

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: BSC_MAINNET.chainId }],
    });
    return true;
  } catch (error) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [BSC_MAINNET],
      });
      return true;
    }

    alert("Network switch rejected");
    return false;
  }
};
