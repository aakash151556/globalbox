import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { CopyText } from "../../utils/CopyHelper";
import { formatDate } from "../../utils/formatDate";

const AdminTeamBussiness = () => {
  const [history, setHistory] = useState([]); // always array
  const [userid, setUserId] = useState(""); // string, not null
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [lvl, setLvl] = useState("0");
  const [loading, setLoading] = useState(false);

  const totalBusiness = history.reduce(
    (sum, item) => sum + Number(item.BV || 0),
    0,
  );
  const bindHistory = async () => {
    try {
      if (!userid) return;
      setLoading(true);

      const obj = {
        obj: {
          userid,
        },
        apiname: "GetTeamBussiness",
      };

      if (lvl && lvl !== "0") {
        obj.obj.lvl = lvl;
      }

      if (from) {
        obj.obj.from = formatDate(from);
      }

      if (to) {
        obj.obj.to = formatDate(to);
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
    bindHistory();
  }, []);

  const fn_Search = () => {
    if (!userid) return;
    bindHistory(userid);
  };

  return (
    <div className="container">
      <div className="card mt-3">
        <div className="card-header bg-primary text-white">
          <h4 className="card-title">Team Bussiness List</h4>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Account Address</label>
              <input
                type="search"
                placeholder="Enter Account Address"
                className="form-control"
                onChange={(e) => setUserId(e.target.value)}
                value={userid}
              />
            </div>
              <div className="col-md-3">
                 <label>From</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setFrom(e.target.value)}
              value={from}
            />
</div>
 <div className="col-md-3">
  <label>To</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setTo(e.target.value)}
              value={to}
            />
            </div>

            <div className="col-md-3">
              <label>Level</label>
              <select
                className="form-control"
                value={lvl}
                onChange={(e) => setLvl(e.target.value)}
              >
                <option value="0">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className="col-md-3 mt-2">
              <br />
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
          <hr />
          <div className="row">
            <div className="col-md-12 table-responsive">
              <table
                className="table table-bordered"
                style={{ textWrap: "nowrap" }}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Account</th>
                    <th>Level</th>
                    <th>Date</th>
                    <th className="text-end">Bussiness</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  )}

                  {!loading && history.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No records found
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    history.map((event, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>
                          {event.FromUserId}
                          <CopyText text={event.FromUserId} />
                        </td>

                        <td>{event.Lvl}</td>
                         <td>{event.EntryDate}</td>
                        <td className="text-end">{event.BV}</td>
                       
                      </tr>
                    ))}
                </tbody>
                {!loading && history.length > 0 && (
                  <tfoot>
                    <tr className="fw-bold bg-light">
                      <td colSpan="4" className="text-end">
                        Total
                      </td>
                      <td className="text-end">
                        {totalBusiness.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTeamBussiness;
