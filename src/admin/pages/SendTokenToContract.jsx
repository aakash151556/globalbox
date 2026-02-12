import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";

import Web3Context from "../../Context/Web3Context";
import Loader from "../../utils/Loader";
import api from "../../api/axios";



const SendTokenToContract = () => {
  const { wallet } = useContext(Web3Context);

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("0");


  /* ---------------------------------- */
  /*        LOAD SELECTED BALANCE        */
  /* ---------------------------------- */
  useEffect(() => {
    
    if (!wallet) return;

    const loadBalance = async () => {
          
      const bal = await wallet.tokenContract.balanceOf(import.meta.env.VITE_TO_STORAGE);

      const decimals = await wallet.tokenContract.decimals();

      setBalance(ethers.formatUnits(bal, decimals));
    };

    loadBalance();
  }, [wallet]);

  /* ---------------------------------- */
  /*           INPUT HANDLER             */
  /* ---------------------------------- */
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setAmount(value);
    }
  };

  /* ---------------------------------- */
  /*              SUBMIT                */
  /* ---------------------------------- */
  const fn_submit = async () => {
    try {
      if (!wallet) return;

      const num = Number(amount);
     
      setLoading(true);

      const storageAddress = import.meta.env.VITE_TO_STORAGE;

     
      /* ---------------- AMOUNTS ---------------- */      
      const decimals = await wallet.tokenContract.decimals();      
      const stakeWeiAmount = ethers.parseUnits(num.toString(), decimals);

      /* ---------------- STAKE TX ---------------- */
      const tx = await wallet.tokenContract.transfer(storageAddress,stakeWeiAmount);
      const receipt = await tx.wait();

      /* ---------------- BACKEND ---------------- */
      const res = await api.post("/DynamicAPI/dynamic-request", {
        obj: {
          contractaddress: storageAddress,
          token: num.toString()         
        },
        apiname: "InsertStorageContractToken",
      });

      if (res?.data?.data?.[0]?.id === 1) {

const explorerUrl = `https://bscscan.com/tx/${receipt.hash}`;
        Swal.fire({
          title: "Token Transfer Successful 🎉",
          html: `
    <p>Token Transfer was completed successfully.</p>
    <a href="${explorerUrl}" target="_blank" style="color:#3085d6">
      View Transaction
    </a>
  `,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => window.location.reload());
      } else {
        alert(res.data.data[0].message || "Backend error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Transaction Failed", err.reason || err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- */
  /*                UI                  */
  /* ---------------------------------- */
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Token Transfer To Contract</h2>
          </div>

          <div className="card-body">
           

            <div className="row mb-3">
              <div className="col-6">
                <label>Contract Coin Balance</label>
                <input
                  type="text"
                  className="form-control"
                  value={balance}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <label>Enter Amount:</label>
                <input
                  type="text"
                  className="form-control"
                  value={amount}
                  inputMode="numeric"
                  placeholder="Enter amount"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="card-footer">
            <button
              className="btn btn-primary"
              onClick={fn_submit}
              disabled={!amount}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SendTokenToContract;
