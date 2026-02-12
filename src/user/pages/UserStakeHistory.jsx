import React, { useEffect, useState } from "react";
import Loader from "../../utils/Loader";
import Web3Context from "../../Context/Web3Context";
import { useContext } from "react";
import { ethers } from "ethers";
import api from "../../api/axios";
import Swal from "sweetalert2";
const UserStakeHistory = () => {
     const { wallet } = useContext(Web3Context);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const bindHistory = async () => {
      const obj = {
        obj: {
          account: wallet.selectedAccount
        },
        apiname: "GetStakeDetail",
      };
      const res = await api.post("/DynamicAPI/dynamic-request", obj);
      setHistory(res.data.data)
    };

    bindHistory();
  }, []);

  return (
    <>
      <div className="container">
        <div className="card mt-3">
          <div className="card-header bg-primary text-white">
            <h4 className="card-title">Stake History</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12  table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Topup USDT</th>
                      <th>Coin Price($)</th>
                      <th>Stake Coin</th>                     
                      <th>Stake For(Months)</th>
                      <th>Stake Age(Months)</th>
                      <th>Stake Date</th>
                      <th>Unstaking On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history &&
                      history.map((event, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{event.stakeusdt}</td>
                          <td>{event.Rate}</td>
                          <td>{event.stakecoin}</td>                        
                          <td>{event.Days}</td>
                          <td>{event.Counter}</td>
                          <td>{event.StakeDate}</td>
                          <td>{event.UnstakeDate}</td>
                          
                       
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserStakeHistory;
