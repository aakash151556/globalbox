import React, { useEffect, useState } from "react";
import Loader from "../../utils/Loader";
import Web3Context from "../../Context/Web3Context";
import { useContext } from "react";
import { ethers } from "ethers";
import api from "../../api/axios";
import Swal from "sweetalert2";
import { CopyText } from "../../utils/CopyHelper";
const UserReferralTeam = () => {
     const { wallet } = useContext(Web3Context);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const bindHistory = async () => {
      const obj = {
        obj: {
          account: wallet.selectedAccount
        },
        apiname: "GetDirectTeam",
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
            <h4 className="card-title">Referral Team</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12  table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Account Code</th>
                    
                      <th>Date</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {history &&
                      history.map((event, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{event.UserId} <CopyText text={event.UserId} /> </td>

                          <td>{event.RegDate}</td>
                          
                          
                       
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

export default UserReferralTeam;
