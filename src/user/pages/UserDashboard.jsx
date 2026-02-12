import React, { useEffect, useState, useContext } from "react";
import ReferralImg from "./../../../public/Referral.png";
import { getWalletFromJwt, isJwtValid } from "./../../utils/jwt";
import Swal from "sweetalert2";
import api from "../../api/axios";
import Logo from "./../../../public/mdl25.png";
import Web3Context from "../../context/Web3Context";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { wallet, setWallet } = useContext(Web3Context);
  const [refLink, setRefLink] = useState("");
  const [packageList, setPackageList] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userCode: null,
    sponsorCode: null,
    userName: null,
    mobile: null,
    email: null,
    status: 0,
    levelincome: 0,
    roiincome: 0,
    totalStake: 0,
    allteam: 0,
    directteam: 0,
    coinPrice: 0,
    stakeWallet: 0,
    levelWallet: 0,
    stakeWithdrawl: 0,
    levelWithdrawl: 0,
    todayBussiness: 0,
    totalBussiness: 0,
  });

  useEffect(() => {
    if (user.userCode) {
      setRefLink(`${window.location.origin}/register?ref=${user.userCode}`);
    }
  }, [user]);

  useEffect(() => {
    if (!wallet) return;

    const bindUser = async () => {
      const obj = {
        obj: {
          account: wallet.selectedAccount,
        },
        apiname: "GetUsers",
      };
      const res = await api.post("/DynamicAPI/dynamic-request", obj);

      if (res.data.status) {
        if (res.data.data.length > 0) {
          setUser({
            userCode: res.data.data[0].UserId,
            sponsorCode: res.data.data[0].SponsorId,
            userName: res.data.data[0].UserName,
            mobile: res.data.data[0].Mobile,
            email: res.data.data[0].Email,
            status: res.data.data[0].Status,
            levelincome: res.data.data[0].levelincome,
            roiincome: res.data.data[0].roiincome,
            totalStake: res.data.data[0].totalStake,
            allteam: res.data.data[0].allteam,
            directteam: res.data.data[0].directteam,
            coinPrice: res.data.data[0].coinPrice,
            stakeWallet: res.data.data[0].stakwallet,
            levelWallet: res.data.data[0].levelwallet,
            stakeWithdrawl: res.data.data[0].stakewithdrawl,
            levelWithdrawl: res.data.data[0].levelwithdrawl,
            todayBussiness: res.data.data[0].todayBussiness,
            totalBussiness: res.data.data[0].totalBussiness,
          });
        }
      } else {
        alert(res.data.message);
      }
    };
    bindUser();

    const bindPackageList = async () => {
      const obj = {
        obj: {
          userid: wallet.selectedAccount,
        },
        apiname: "GetPackage",
      };
      const res = await api.post("/DynamicAPI/dynamic-request", obj);

      if (res.data.data.length > 0) {
        
        setPackageList(res.data.data);
      }
    };
    bindPackageList();
  }, [wallet]);

  useEffect(()=>{
// console.log(packageList)
  },[packageList])


  const fn_CopyRefLink = async () => {
    try {
      await navigator.clipboard.writeText(refLink);

      Swal.fire({
        title: "Success!",
        text: refLink,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="bg-body rounded shadow-sm">
            <div className="card mt-2">
              <div className="useraccount">
                <h5 className="card-title cardtext"> User Account</h5>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <b>Your Account :</b> <span>{user.userCode}</span>
                </p>

                <p className="card-text">
                  <b> Sponsor Account :</b> <span>{user.sponsorCode}</span>
                </p>
                <p className="card-text" hidden>
                  <b>MDL Coin Price :</b> <span>{user.coinPrice}$</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="bg-body rounded shadow-sm">
            <div className="card mt-2">
              <div className="useraccount">
                <h5 className="card-title cardtext"> Referral Link </h5>
              </div>
              <img src={ReferralImg} alt="Logo" />
              <div className="row p-2">
                <div className="col-12 text-center">
                  <p>{refLink}</p>
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={fn_CopyRefLink}
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <div className="bhas">
          <h4>Live Global Box</h4>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-bordered table-striped ">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Global Team</th>
                    <th>My Topup</th>
                    <th>Claim</th>
                  </tr>
                </thead>
                <tbody>
                  {packageList &&
                    packageList.map((val, key) => 
                      <tr>
                        <th>{val.PlanName}</th>
                        <td>{val.Amount}</td>
                        <td>{val.Team}</td>
                        <td>{val.MyTopup}</td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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
                          <h2>MDL {user.totalStake}</h2>
                          <p className="text-nowarp">Total Stake</p>
                        </div>
                        <div className="icons" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3" hidden>
                  <div className="card mt-1 mb-3 box-1 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>MDL {user.roiincome}</h2>
                          <p>Claimable Staking</p>
                        </div>
                        <div className="icons" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card mt-1 mb-3 box-2 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>$ {user.todayBussiness}</h2>
                          <p>Today Bussiness</p>
                        </div>

                        <div className="icons" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card mt-1 mb-3 box-2 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>$ {user.totalBussiness}</h2>
                          <p>Total Bussiness</p>
                        </div>

                        <div className="icons" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card mt-1 mb-3 box-2 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>$ {user.levelincome}</h2>
                          <p>Referral Income</p>
                        </div>

                        <div className="icons" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card mt-1 mb-3  box-4 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>{user.directteam}</h2>
                          <p>Direct Team</p>
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
                          <h2>{user.allteam}</h2>
                          <p>All Team</p>
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

      <div className="my-3  bg-body rounded shadow-sm">
        <div className="bhas">
          <h4>Wallet</h4>
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
                          <h2>MDL {user.stakeWithdrawl}</h2>
                          <p className="text-nowarp">Stake Claimed</p>
                        </div>
                        <div className="icons" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3" hidden>
                  <div className="card mt-1 mb-3 box-1 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>MDL {user.stakeWallet}</h2>
                          <p className="text-nowarp">Stake Balance</p>
                        </div>
                        <div className="icons" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card mt-1 mb-3 box-2 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>$ {user.levelWithdrawl}</h2>
                          <p>Total Claimed</p>
                        </div>
                        <div className="icons" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card mt-1 mb-3 box-2 zoom-effect">
                    <div className="card-body">
                      <div className="d-flex more_flex">
                        <div>
                          <h2>$ {user.levelWallet}</h2>
                          <p>Total Balance</p>
                        </div>
                        <div className="icons" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <hr />

      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <div className="bhas">
          <h4>Bussiness</h4>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-bordered table-striped ">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Self</th>
                    <th>Direct</th>
                    <th>Team</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Normal</th>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>Manager</th>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>S.Manager</th>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>Diamond</th>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <div className="bhas">
          <h4>Normal Investment</h4>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped ">
            <thead>
              <tr>
                <th>Invest</th>
                <th>Invest On</th>
                <th>Claim Amount</th>
                <th>Claim On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>

      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <div className="bhas">
          <h4>Manager Investment</h4>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped ">
            <thead>
              <tr>
                <th>Invest</th>
                <th>Invest On</th>
                <th>Claim Amount</th>
                <th>Claim On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>

      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <div className="bhas">
          <h4>Super Manager Investment</h4>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered .table-striped ">
            <thead>
              <tr>
                <th>Invest</th>
                <th>Invest On</th>
                <th>Claim Amount</th>
                <th>Claim On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>

      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <div className="bhas">
          <h4>Diamond Investment</h4>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped ">
            <thead>
              <tr>
                <th>Invest</th>
                <th>Invest On</th>
                <th>Claim Amount</th>
                <th>Claim On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div> */}
    </>
  );
};

export default UserDashboard;
