import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";

import Web3Context from "../../Context/Web3Context";
import Loader from "../../utils/Loader";
import api from "../../api/axios";
import { signClaim } from "../../utils/signClaim";

const UserClaim = () => {
  const { wallet } = useContext(Web3Context);

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("0");

  /* ---------------------------------- */
  /* LOAD BALANCE & PRICE               */
  /* ---------------------------------- */
  useEffect(() => {
    if (!wallet) return;

    const loadData = async () => {
      try {
        const res = await api.post("/DynamicAPI/dynamic-request", {
          obj: { userid: wallet.selectedAccount },
          apiname: "GetBalance",
        });

        setBalance(res.data.data[0].Balance);
      } catch (e) {
        console.error(e);
      }
    };

    loadData();
  }, [wallet]);

  /* ---------------------------------- */
  /* INPUT                              */
  /* ---------------------------------- */
  const handleChange = (e) => {
    const v = e.target.value;
    if (v === "" || /^[0-9]+(\.[0-9]+)?$/.test(v)) {
      setAmount(v);
    }
  };

  /* ---------------------------------- */
  /* SUBMIT                             */
  /* ---------------------------------- */
  const fn_submit = async () => {
    try {
      if (!wallet) return;

      const usdAmount = Number(amount);
      if (usdAmount >= 10) {
        Swal.fire("Invalid amount", "less than or equal to 10$", "warning");
        return;
      }

      setLoading(true);

      const storageAddress = import.meta.env.VITE_TO_STORAGE;

      /* ---------------- SYMBOLS ---------------- */

      const usdtSymbol = ethers.encodeBytes32String("USDT");

      /* ---------------- CONTRACTS ---------------- */
      const business = wallet.bussinessContract;
      const usdt = wallet.usdtContract;

      /* ---------------- NONCE ---------------- */
      const nonce = await business.nonces(wallet.selectedAccount);

      /* ---------------- EXPIRY ---------------- */
    //  const expiry = Math.floor(Date.now() / 1000) + 300; // 5 minutes
const expiry = BigInt(Math.floor(Date.now() / 1000) + 300);
      /* ---------------- AMOUNTS ---------------- */
      const usdtDecimals = await usdt.decimals();

      const usdtWei = ethers.parseUnits(usdAmount.toString(), usdtDecimals);
//    console.log(
//   JSON.stringify({
//     to: wallet.selectedAccount,
//     symbol: usdtSymbol,
//     maxAmount: usdtWei.toString(),
//     nonce: nonce.toString(),
//     expiry: expiry.toString(),
//     chainId: wallet.chainId,
//     businessLogicAddress: business.target,
//   })
// );

      // const signature = await signClaim({
      //   signer: wallet.signer,
      //   to: wallet.selectedAccount,
      //   symbol: usdtSymbol,
      //   maxAmount: usdtWei,
      //   nonce,
      //   expiry,
      //   contractAddress: business.target,
      // });
      // console.log(signature);
      /* ---------------- BACKEND SIGN ---------------- */
      const signRes = await api.post("/DynamicAPI/sign", {
        to: wallet.selectedAccount,
        symbol: usdtSymbol,
        maxAmount: usdtWei.toString(), // backend decides max
        nonce: nonce.toString(),
        expiry: expiry.toString(),
        chainId: wallet.chainId,
        businessLogicAddress: business.target,
      });

      const { signature } = signRes.data;
      if (!signature) throw new Error("Signature not received");
      // console.log(signature);

      // const verify_signature=await business.getSignedMessage(usdtSymbol,wallet.selectedAccount,usdtWei,expiry,signature)
      // console.log(verify_signature)

          /* ---------------- BACKEND ---------------- */
          const res = await api.post("/DynamicAPI/dynamic-request", {
            obj: {
              userid: wallet.selectedAccount,
              amount: amount,
            },
            apiname: "InsertWithdrawlRequest",
          });
      if (res?.data?.data?.[0]?.id === 1) {
          /* ---------------- CLAIM TX ---------------- */

            const tx=await business.claim(usdtSymbol,wallet.selectedAccount,usdtWei,usdtWei,expiry,signature)

         //  const tx=await business.claim(usdtSymbol,wallet.selectedAccount,usdtWei)

            const receipt = await tx.wait();
            const approve_res = await api.post("/DynamicAPI/dynamic-request", {
              obj: {
                userid: wallet.selectedAccount,
                TransactionId: res?.data?.data?.[0]?.TransactionId,
                trnhash: receipt.hash,
              },
              apiname: "ApproveWithdrawlRequest",
            });
            if (approve_res?.data?.data?.[0]?.id === 1) {
              Swal.fire({
                title: "Claim Successful 🎉",
                html: `
                <p>Claim completed successfully.</p>
                <a href="https://bscscan.com/tx/${receipt.hash}" target="_blank">
                  View Transaction
                </a>
              `,
                icon: "success",
              }).then(() => window.location.reload());
            } else {
              throw new Error(res.data.data[0].msg);
            }
          } else {
            throw new Error(res.data.data[0].msg);
          }
    } catch (err) {
      console.error(err);
      await api.post("/DynamicAPI/dynamic-request", {
        obj: {
          account: wallet.selectedAccount,
          error: err.toString(),
        },
        apiname: "InsertErrorLog",
      });

      Swal.fire("Transaction Failed", err.reason || err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- */
  /* UI                                 */
  /* ---------------------------------- */
  return loading ? (
    <Loader />
  ) : (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Claim Commission</h2>
      </div>

      <div className="card-body">
        <label>Level Balance($)</label>
        <input
          className="form-control mb-2"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          readOnly
        />

        <label>Enter Amount</label>
        <input
          className="form-control mb-2"
          placeholder="Enter Amount"
          value={amount}
          onChange={handleChange}
        />
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
  );
};

export default UserClaim;
