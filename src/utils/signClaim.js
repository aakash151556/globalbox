import { ethers } from "ethers";

export async function signClaim({
  signer,           // ethers.Signer (MetaMask)
  to,               // address
  symbol,           // bytes32 hex string
  maxAmount,        // bigint
  nonce,            // bigint (READ FROM CONTRACT!)
  expiry,           // bigint
  contractAddress   // verifying contract
}) {
  // 1️⃣ get chainId from the SAME provider
  const { chainId } = await signer.provider.getNetwork();

  // 2️⃣ abi.encode (MUST match Solidity order & types)
  const encoded = ethers.AbiCoder.defaultAbiCoder().encode(
    [
      "address",
      "bytes32",
      "uint256",
      "uint256",
      "uint256",
      "uint256",
      "address"
    ],
    [
      to,
      symbol,
      maxAmount,
      nonce,
      expiry,
      chainId,
      contractAddress
    ]
  );

  // 3️⃣ keccak256
  const hash = ethers.keccak256(encoded);

  // 4️⃣ sign raw bytes (Ethereum prefix applied here)
  const signature = await signer.signMessage(
    ethers.getBytes(hash)
  );

  return signature;
}
