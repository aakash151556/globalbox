import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";

import Web3Context from "../../Context/Web3Context";
import Loader from "../../utils/Loader";
import api from "../../api/axios";

const AdminStakeTopup = () => {
  const { wallet } = useContext(Web3Context);

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [price, setPrice] = useState("0");
  const [totalStaking, setTotalStaking] = useState("0");
  const [days, setDays] = useState("0");

  useEffect(() => {
    if (!wallet) return;

    const loadData = async () => {
      try {
        const res = await api.post("/DynamicAPI/dynamic-request", {
          obj: {},
          apiname: "GetCoinPrice",
        });

        setPrice(res.data.data[0].Price);
      } catch (e) {
        console.error(e);
      }
    };

    loadData();
  }, [wallet]);

  const handleChange = (e) => {
    const v = e.target.value;
    if (v === "" || /^[0-9]+(\.[0-9]+)?$/.test(v)) {
      setAmount(v);
      if (price && Number(price) > 0) {
        setTotalStaking((Number(v) / Number(price)).toFixed(6));
      }
    }
  };

  const fn_submit = async () => {
    try {
      if (!wallet) return;

      const usdAmount = Number(amount);
      const stakeAmount = Number(totalStaking);

      // if (usdAmount < 10 || usdAmount > 100) {
      //   Swal.fire("Invalid amount", "10–100 only", "warning");
      //   return;
      // }
      if (days < 1) {
        Swal.fire("Enter days", "warning");
        return;
      }
      setLoading(true);

      const totalDays = 86400 * days;
      const stakeWei = ethers.parseUnits(stakeAmount.toString(), 18);

      const receipt = await api.post(
        "/DynamicAPI/stake-by-admin",
        JSON.stringify({
          user: account,
          stakeSymbol: "MDL",
          stakeAmount: stakeWei.toString(),
          lockPeriod: totalDays,
        }),
      );
      if (!receipt) {
        alert("unknown error occured");
        return;
      }

      console.log(receipt.data);
      /* ---------------- GET stakeId ---------------- */
      const storageIface = wallet.storageContract.interface;

      const stakeEvent = receipt.data.logs
        .map((log) => {
          try {
            return storageIface.parseLog(log);
          } catch {
            return null;
          }
        })
        .find((e) => e?.name === "StakeCreated");

      const stakeId = stakeEvent?.args?.stakeId?.toString();
      if (stakeId && receipt.data.transactionHash) {
        console.log(stakeId, receipt.data.transactionHash);

        /* ---------------- BACKEND ---------------- */
        const res = await api.post("/DynamicAPI/dynamic-request", {
          obj: {
            account: account,
            topupamount: amount,
            txnhash: receipt.data.transactionHash,
            stakeId,
            paymentToken: "USDT",
            topupType:"admin",
            days:days
          },
          apiname: "TopupUserWithWallet",
        });

        if (res?.data?.data?.[0]?.id === 1) {
          Swal.fire({
            title: "Stake Successful 🎉",
            html: `
            <p>Stake completed successfully.</p>
            <a href="https://bscscan.com/tx/${receipt.data.transactionHash}" target="_blank">
              View Transaction
            </a>
          `,
            icon: "success",
          }).then(() => window.location.reload());
        }
        else{
           throw new Error("something went wrong");
           
        }
      } else {
        throw new Error(res.data.data[0].message);
      }
    } catch (err) {
      console.error(err);
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
        <h2 className="card-title">Stake Topup</h2>
      </div>

      <div className="card-body">
        <label>Account Address:</label>
        <input
          className="form-control mb-2"
          placeholder="Enter Account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />

        <label>Coin Price ($)</label>
        <input className="form-control mb-2" value={price} readOnly />

        <label>Enter Amount:</label>
        <input
          className="form-control mb-2"
          placeholder="Enter amount"
          value={amount}
          onChange={handleChange}
        />

        <label>Total Staking</label>
        <input className="form-control" value={totalStaking} readOnly />

        <label>Locking Period(In Days):</label>
        <input
          className="form-control mb-2"
          value={days}
          onChange={(e) => setDays(e.target.value)}
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

export default AdminStakeTopup;
