import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";

import Web3Context from "../../Context/Web3Context";
import Loader from "../../utils/Loader";

const ClaimLevelApproval = () => {
  const { wallet } = useContext(Web3Context);

  const [loading, setLoading] = useState(false);
  const [allowance, setAllowance] = useState("0");

  const storageAddress = import.meta.env.VITE_TO_STORAGE;
  const fundReceiver   = import.meta.env.VITE_TO_FUND_GIVER;

  /* ---------------------------------- */
  /* LOAD CURRENT ALLOWANCE             */
  /* ---------------------------------- */
  useEffect(() => {
    if (!wallet) return;

    const loadAllowance = async () => {
      try {
        const usdtToken = wallet.usdtContract;

        const raw = await usdtToken.allowance(
          wallet.selectedAccount,
          storageAddress
        );

        const decimals = await usdtToken.decimals();
        setAllowance(ethers.formatUnits(raw, decimals));
      } catch (e) {
        console.error(e);
      }
    };

    loadAllowance();
  }, [wallet]);

  /* ---------------------------------- */
  /* APPROVE STORAGE                    */
  /* ---------------------------------- */
  const approveStorage = async () => {
    try {
      if (!wallet) return;

      // 🔒 Ensure ONLY fundReceiver can approve
      
      if (
        wallet.selectedAccount.toLowerCase() !==
        fundReceiver.toLowerCase()
      ) {
        Swal.fire(
          "Unauthorized",
          "This wallet is not the fund receiver",
          "error"
        );
        return;
      }

      setLoading(true);

      const usdtToken = wallet.usdtContract;

      // MAX allowance (recommended)
      const tx = await usdtToken.approve(
        storageAddress,
        ethers.MaxUint256
      );

      await tx.wait();

      Swal.fire(
        "Approved",
        "Storage contract approved successfully",
        "success"
      );

      // reload allowance
      const raw = await usdtToken.allowance(
        wallet.selectedAccount,
        storageAddress
      );
      const decimals = await usdtToken.decimals();
      setAllowance(ethers.formatUnits(raw, decimals));
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Approval Failed",
        err.reason || err.message,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- */
  /* UI                                */
  /* ---------------------------------- */
  return loading ? (
    <Loader />
  ) : (
    <div className="card">
      <div className="card-header">
        <h3>Claim USDT Approval</h3>
      </div>

      <div className="card-body">
        <p>
          <strong>Storage Contract:</strong><br />
          {fundReceiver}
        </p>

        <p>
          <strong>Current Allowance:</strong><br />
          {allowance}
        </p>
      </div>

      <div className="card-footer">
        <button
          className="btn btn-warning"
          onClick={approveStorage}
        >
          Approve Storage (MAX)
        </button>
      </div>
    </div>
  );
};

export default ClaimLevelApproval;
