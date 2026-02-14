import React, { useEffect, useState, useContext } from "react";


import Swal from "sweetalert2";
import api from "../../api/axios";
import Logo from "./../../../public/mdl25.png";


const AdminDashboard = () => {

  const [user, setUser] = useState({
    coinPrice: 0,
    totalUser: 0,
    todayUser: 0,
    totalStakeCoin: 0,
    todayStakeCoin: 0,
    totalBussiness: 0,
    todayBussiness: 0,
    totalIncome: 0,
    todayIncome: 0,
    totalWithdrawl: 0,
    totalBalance: 0,
  });

  useEffect(() => {

    const bindDashboard = async () => {
      const obj = {
        obj: {},
        apiname: "GetAdminDashboard",
      };
      const res = await api.post("/DynamicAPI/dynamic-request", obj);
      if (res.data.status) {
        setUser({
          coinPrice: res.data.data[0].coinPrice,
          totalUser: res.data.data[0].totalUser,
          todayUser: res.data.data[0].todayUser,
          totalStakeCoin: res.data.data[0].totalStakeCoin,
          todayStakeCoin: res.data.data[0].todayStakeCoin,
          totalBussiness: res.data.data[0].totalBussiness,
          todayBussiness: res.data.data[0].todayBussiness,
          totalIncome: res.data.data[0].totalIncome,
          todayIncome: res.data.data[0].todayIncome,
          totalWithdrawl: res.data.data[0].totalWithdrawl,
          totalBalance: res.data.data[0].totalBalance,
        });
      } else {
        alert(res.data.message);
      }
    };
    bindDashboard();
  }, []);



  return (
    <>
      <div className="my-3  bg-body rounded shadow-sm">
        <div className="bhas">
          <h4>Dashboard</h4>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <div className="padings">
              <div className="row">
                <div className="col-md-3" hidden>
                  <div className="card mt-1 mb-3 box-1 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>${user.coinPrice}</h2>
                          <p className="text-nowarp">Current Price</p>
                        </div>
                        <div className="icons" style={{ width: "30%" }}>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card mt-1 mb-3 box-1 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>{user.totalUser}</h2>
                          <p>Total User</p>
                        </div>
                        <div className="icons" style={{ width: "30%" }}>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card mt-1 mb-3 box-2 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2> {user.todayUser}</h2>
                          <p>Today User</p>
                        </div>

                        <div className="icons" style={{ width: "30%" }}>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3" hidden>
                  <div className="card mt-1 mb-3  box-4 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>MDL {user.totalStakeCoin}</h2>
                          <p>Total Stake</p>
                        </div>

                        <div className="icons"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3" hidden>
                  <div className="card mt-1 mb-3  box-4 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>MDL {user.todayStakeCoin}</h2>
                          <p>Today Stake</p>
                        </div>

                        <div className="icons"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card mt-1 mb-3  box-4 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>${user.totalBussiness}</h2>
                          <p>Total Bussiness</p>
                        </div>
                        <div className="icons"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card mt-1 mb-3  box-4 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>${user.todayBussiness}</h2>
                          <p>Today Bussiness</p>
                        </div>
                        <div className="icons"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card mt-1 mb-3  box-4 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>${user.totalIncome}</h2>
                          <p>Total Income</p>
                        </div>
                        <div className="icons"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card mt-1 mb-3  box-4 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>${user.todayIncome}</h2>
                          <p>Today Income</p>
                        </div>
                        <div className="icons"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card mt-1 mb-3  box-4 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>${user.totalWithdrawl}</h2>
                          <p>Total Withdrawl</p>
                        </div>
                        <div className="icons"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card mt-1 mb-3  box-4 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>${user.totalBalance}</h2>
                          <p>Total Balance</p>
                        </div>
                        <div className="icons"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
