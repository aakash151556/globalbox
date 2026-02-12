import React, { useEffect, useState } from "react";
import Loader from "../../utils/Loader";
import Web3Context from "../../Context/Web3Context";
import { useContext } from "react";
import { ethers } from "ethers";
import api from "../../api/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const UserLevelWiseTeam = () => {
     const { wallet } = useContext(Web3Context);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const bindHistory = async () => {
      const obj = {
        obj: {
          account: wallet.selectedAccount
        },
        apiname: "GetLevelTeam",
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
            <h4 className="card-title">Level Team</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12  table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      
                      <th>Level</th>
                    
                      <th>Total</th>
                      <th>Income</th>
                      <th>View</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {history &&
                      history.map((event, key) => (
                        <tr key={key}>
                          
                          <td>{event.Lvl}</td>

                          <td>{event.T}</td>
                          <td>{event.Income}</td>
                          <td>
                            <Link to={`/user/level-team?lvl=${event.Lvl}`}>
                            View
                            </Link>
                          </td>
                          
                          
                       
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

export default UserLevelWiseTeam;
