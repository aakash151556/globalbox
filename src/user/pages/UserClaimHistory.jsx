import React, { useEffect, useState } from "react";
import Loader from "../../utils/Loader";
import Web3Context from "../../Context/Web3Context";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ethers } from "ethers";
import api from "../../api/axios";
import Swal from "sweetalert2";
import { CopyText } from "../../utils/CopyHelper";
const UserClaimHistory = () => {
  
  const { wallet } = useContext(Web3Context);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const bindHistory = async () => {
      const obj = {
        obj: {
          userid: wallet.selectedAccount
        },
        apiname: "GetWithdrawlRequestList",
      };
      const res = await api.post("/DynamicAPI/dynamic-request", obj);
      setHistory(res.data.data);
    };

    bindHistory();
  }, []);

  return (
    <>
      <div className="container">
        <div className="card mt-3">
          <div className="card-header bg-primary text-white">
            <h4 className="card-title">Claim History</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12  table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      
                      <th>Claim Amount</th>
                      <th>Status</th>
                      <th>Tran.Hash</th>
                      <th>Claim On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history &&
                      history.map((event, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{event.Amount}</td>
                          <td>{event.Status}</td>
                          <td>{event.TrnHash}{event.Status=="Approved"?<CopyText text={event.TrnHash} />:""}</td>
                          <td>{event.EntryDate}</td>
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

export default UserClaimHistory;
