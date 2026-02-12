export const requestWalletPermission = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask or Trust Wallet");
    return null;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts?.[0] || null;
};
