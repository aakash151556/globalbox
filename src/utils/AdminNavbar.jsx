import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className="nav-scroller  shadow-sm bga">
      <div className="container">
        <nav
          className="nav"
          aria-label="Secondary navigation"
          style={{ justifyContent: "start" }}
        >
          <Link className="nav-link text-uppercas" to="/admin/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link text-uppercas" to="/admin/staking-by-admin">
            Stake Topup
          </Link>
          <Link className="nav-link text-uppercas" to="/admin/user-list">
            Address List
          </Link>
          <Link
            className="nav-link text-uppercas"
            to="/admin/team-bussiness-list"
          >
            Team Bussiness List
          </Link>
          <Link className="nav-link text-uppercas" to="/admin/change-price">
            Change Price
          </Link>
          {/* <Link className="nav-link text-uppercase" to="/admin/token-transfer-to-contract">
            Send Token To Contract
          </Link>
              <Link className="nav-link text-uppercase" to="/admin/fund-receiver-approval">
            Fund Receiver Approval
          </Link>
           <Link className="nav-link text-uppercase" to="/admin/claim-reciever-approval">
            Fund Receiver Approval
          </Link> */}
        </nav>
      </div>
    </div>
  );
};

export default AdminNavbar;
