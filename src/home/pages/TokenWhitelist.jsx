import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";

const TokenWhitelist = () => {
  const { wallet, setWallet } = useContext(Web3Context);
  const [symbol, setSymbol] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  
    useEffect(() => {
      if (!sessionStorage.getItem("wallet")) return;
      const parsed=JSON.parse(sessionStorage.getItem("wallet"))
      
      setWallet(parsed);
    }, []);

  const whitelistToken = async () => {
    try {
      setError("");
      setTxHash("");

      if (!window.ethereum) {
        setError("Wallet not found");
        return;
      }

      if (!symbol || !tokenAddress) {
        setError("Symbol and token address required");
        return;
      }

      if (!ethers.isAddress(tokenAddress)) {
        setError("Invalid token address");
        return;
      }

      setLoading(true);

      const symbolBytes32 = ethers.encodeBytes32String(symbol);
 
      const tx = await wallet.storageContract.whitelistToken(
        symbolBytes32,
        tokenAddress
      );

      await tx.wait();

      setTxHash(tx.hash);
    } catch (err) {
      console.error(err);
      setError(err.reason || err.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Whitelist Token</h2>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <input
              type="text"
              placeholder="Token Symbol (e.g. USDT)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Token Address"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              style={styles.input}
            />

            <button
              onClick={whitelistToken}
              disabled={loading}
              style={styles.button}
            >
              {loading ? "Processing..." : "Whitelist Token"}
            </button>

            {txHash && (
              <p style={styles.success}>✅ Tx Sent: {txHash.slice(0, 10)}...</p>
            )}

            {error && <p style={styles.error}>❌ {error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    maxWidth: "420px",
    padding: "20px",
    borderRadius: "10px",
    background: "#111",
    color: "#fff",
    margin: "20px auto",
    boxShadow: "0 0 12px rgba(0,0,0,0.4)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #333",
    background: "#1a1a1a",
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#4caf50",
    color: "#fff",
    fontWeight: "bold",
  },
  success: { color: "#4caf50" },
  error: { color: "#ff5252" },
};

export default TokenWhitelist;
