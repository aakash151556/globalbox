import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";

import Loader from "../../utils/Loader";
import api from "../../api/axios";

const ChangePrice = () => {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("0");
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
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
  }, []);

  const fn_submit = async () => {
    try {
      if (!newPrice) return;

      const res = await api.post("/DynamicAPI/dynamic-request", {
        obj: {
          price: newPrice,
        },
        apiname: "ChangePrice",
      });

      if (res?.data?.data?.[0]?.id === 1) {
        Swal.fire({
          title: "Price Change Successful 🎉",
          text: "New Price Updated Successfull!",
          icon: "success",
        }).then(() => window.location.reload());
      }
      else{
                   throw new Error("something went wrong");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Transaction Failed", err.reason || err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Change Price</h2>
      </div>

      <div className="card-body">
        <label>Coin Price ($)</label>
        <input className="form-control mb-2" value={price} readOnly />

        <label>Enter New Price($)</label>
        <input
          className="form-control mb-2"
          placeholder="Enter new price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
      </div>

      <div className="card-footer">
        <button
          className="btn btn-primary"
          onClick={fn_submit}
          disabled={!newPrice}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChangePrice;
