import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { CopyText } from "../../utils/CopyHelper";

const UserList = () => {
  const [history, setHistory] = useState([]); // always array
  const [userid, setUserId] = useState(""); // string, not null
  const [loading, setLoading] = useState(false);

  const bindHistory = async (userid) => {
    try {
      setLoading(true);

      const obj = {
        obj: {},
        apiname: "GetUserList",
      };

      if (userid) {
        obj.obj.account = userid;
      }

      const res = await api.post("/DynamicAPI/dynamic-request", obj);

      if (Array.isArray(res.data.data)) {
        setHistory(res.data.data);
      } else {
        setHistory([]);
      }
    } catch (err) {
      console.error("Error loading user list:", err);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  // Load all users on first load
  useEffect(() => {
    bindHistory(null);
  }, []);

  // Search when userid changes
  useEffect(() => {
    if (userid === "") {
      bindHistory(null);
    } else {
      bindHistory(userid);
    }
  }, [userid]);
  const fn_Search = () => {
    if (!userid) return;
    bindHistory(userid);
  };

  return (
    <div className="container">
      <div className="card mt-3">
        <div className="card-header bg-primary text-white">
          <h4 className="card-title">Address List</h4>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="search"
                placeholder="Enter Account Address"
                className="form-control"
                onChange={(e) => setUserId(e.target.value)}
                value={userid}
              />
            </div>
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-primary"
                onClick={fn_Search}
                name="btnSearch"
              >
                Search
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 table-responsive">
              <table
                className="table table-bordered"
                style={{ textWrap: "nowrap" }}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Account Code</th>
                    <th>Referral Code</th>
                    <th>Topup In USDT</th>
                    {/* <th>Total Stake</th>
                    <th>Release Coin</th> */}
                    <th>Total Income</th>
                    <th>Total Withdrawl</th>
                    <th>Pending Withdrawl</th>
                    <th>Total Balance</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="11" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  )}

                  {!loading && history.length === 0 && (
                    <tr>
                      <td colSpan="11" className="text-center">
                        No records found
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    history.map((event, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{event.UserId}<CopyText text={event.UserId} /></td>
                        <td>{event.SponsorId}<CopyText text={event.UserId} /></td>
                        <td>{event.TotalTopup}</td>
                        {/* <td>{event.TotalStake}</td>
                        <td>{event.ROIIncome}</td> */}
                        <td>{event.LevelIncome}</td>
                        <td>{event.LevelWithdrawl}</td>
                        <td>{event.PendingWithdrawl}</td>
                        <td>{event.Levelbalance}</td>
                        <td>{event.StakeOn}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
