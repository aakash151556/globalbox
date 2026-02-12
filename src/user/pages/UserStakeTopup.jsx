import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";

import Web3Context from "../../Context/Web3Context";
import Loader from "../../utils/Loader";
import api from "../../api/axios";

const PAYMENT_TOKENS = {
  USDT: {
    label: "USDT",
    symbol: "USDT",
    getContract: (wallet) => wallet.usdtContract,
  },
};

const UserStakeTopup = () => {
  const { wallet } = useContext(Web3Context);

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("10");
  const [balance, setBalance] = useState("0");
  const [price, setPrice] = useState("0");
  const [totalStaking, setTotalStaking] = useState("0");
  const [paymentKey, setPaymentKey] = useState("USDT");

  /* ---------------------------------- */
  /* LOAD BALANCE & PRICE               */
  /* ---------------------------------- */
  useEffect(() => {
    if (!wallet) return;

    const loadData = async () => {
      try {
        const token = PAYMENT_TOKENS[paymentKey];
        const contract = token.getContract(wallet);

        const bal = await contract.balanceOf(wallet.selectedAccount);
        const decimals = await contract.decimals();

        setBalance(ethers.formatUnits(bal, decimals));

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
  }, [wallet, paymentKey]);

  /* ---------------------------------- */
  /* INPUT                              */
  /* ---------------------------------- */
  const handleChange = (e) => {
    const v = e.target.value;
    if (v === "" || /^[0-9]+(\.[0-9]+)?$/.test(v)) {
      setAmount(v);
      if (price && Number(price) > 0) {
        setTotalStaking((Number(v) / Number(price)).toFixed(6));
      }
    }
  };

  /* ---------------------------------- */
  /* SUBMIT                             */
  /* ---------------------------------- */
  const fn_submit = async () => {
    try {
      if (!wallet) return;

      const usdAmount = Number(amount);
     // const stakeAmount = Number(totalStaking);

      // if (usdAmount < 10 || usdAmount > 100) {
      //   Swal.fire("Invalid amount", "10–100 only", "warning");
      //   return;
      // }

      setLoading(true);

      //const storageAddress = import.meta.env.VITE_TO_STORAGE;

      /* ---------------- SYMBOLS ---------------- */
      //const stakeSymbol = ethers.encodeBytes32String("MDL");
      const paySymbol = ethers.encodeBytes32String("USDT");

      /* ---------------- CONTRACTS ---------------- */
      const usdt = wallet.usdtContract;
     // const stakeToken = wallet.tokenContract;
     // const storageContract = wallet.storageContract;

      /* ---------------- AMOUNTS ---------------- */
       const usdtDecimals = await usdt.decimals();
      // const stakeDecimals = await stakeToken.decimals();

       const usdtWei = ethers.parseUnits(usdAmount.toString(), usdtDecimals);

      // const stakeWei = ethers.parseUnits(stakeAmount.toString(), stakeDecimals);
      // console.log("MDL", stakeSymbol, usdtWei.toString());
      // console.log("USDT", paySymbol, stakeWei.toString());
      /* ---------------- APPROVALS ---------------- */

      // 1️⃣ USDT approval
      // const usdtAllowance = await usdt.allowance(
      //   wallet.selectedAccount,
      //   storageAddress,
      // );

      // if (usdtAllowance < usdtWei) {
      //   const tx = await usdt.approve(storageAddress, usdtWei);
      //   await tx.wait();
      // }

      // 2️⃣ StakeToken approval
      // const stakeAllowance = await stakeToken.allowance(
      //   wallet.selectedAccount,
      //   storageAddress,
      // );
      // console.log(stakeAllowance, stakeWei);
      // if (stakeAllowance < stakeWei) {
      //   const tx = await stakeToken.approve(storageAddress, stakeWei);
      //   await tx.wait();
      // }

      /* ---------------- STAKE TX ---------------- */
      // const tx = await wallet.stakingContract.stakeByUser(
      //   stakeSymbol,
      //   stakeWei,
      //   paySymbol,
      //   usdtWei,
      // );

      //  const tx = await wallet.storageContract.createStake(
      //   wallet.selectedAccount,
      //   stakeSymbol,
      //   stakeWei,
      //   paySymbol,
      //   usdtWei,
      //   31536000000

      // );

      const tx=await usdt.transfer(import.meta.env.VITE_TO_FUND_RECIEVER,usdtWei)

      const receipt = await tx.wait();

      /* ---------------- GET stakeId ---------------- */
      // const storageIface = wallet.storageContract.interface;

      // const stakeEvent = receipt.logs
      //   .map((log) => {
      //     try {
      //       return storageIface.parseLog(log);
      //     } catch {
      //       return null;
      //     }
      //   })
      //   .find((e) => e?.name === "StakeCreated");

      // const stakeId = stakeEvent?.args?.stakeId?.toString();

      /* ---------------- BACKEND ---------------- */
      const res = await api.post("/DynamicAPI/dynamic-request", {
        obj: {
          account: wallet.selectedAccount,
          topupamount: amount,
          txnhash: receipt.hash,
          stakeId:0,
          paymentToken: "USDT",
          topupType: "User",
          days: 0
        },
        apiname: "TopupUserWithWallet",
      });

      if (res?.data?.data?.[0]?.id === 1) {
        Swal.fire({
          title: "Topup Successful 🎉",
          html: `
            <p>Topup completed successfully.</p>
            <a href="https://bscscan.com/tx/${receipt.hash}" target="_blank">
              View Transaction
            </a>
          `,
          icon: "success",
        }).then(() => window.location.reload());
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
        <h2 className="card-title">Box Topup</h2>
      </div>

      <div className="card-body">
        <label>Balance ({paymentKey})</label>
        <input className="form-control mb-2" value={balance} readOnly />

        {/* <label>Coin Price ($)</label>
        <input className="form-control mb-2" value={price} readOnly /> */}

        <label>Choose Box</label>
        <select id="ddBox" defaultValue={amount} onChange={(e)=>setAmount(e.target.value)} className="form-control">
          <option value="10">10$</option>
          <option value="20">20$</option>
          <option value="50">50$</option>
          <option value="100">100$</option>
        </select>

        {/* <label>Total Staking</label>
        <input className="form-control" value={totalStaking} readOnly /> */}
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

export default UserStakeTopup;
