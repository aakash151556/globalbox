import React from "react";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <div className="nav-scroller  shadow-sm bga">
      <div className="container">
        <nav className="nav" aria-label="Secondary navigation">
        

          <Link className="nav-link text-uppercas" to="/user/stake-topup">
            BOX TOPUP
          </Link>

          {/* <Link className="nav-link text-uppercase" to="/user/stake-history">
            Topup History
          </Link> */}

          <Link className="nav-link text-uppercase" to="/user/referral-team">
            Referral Team
          </Link>

          <Link className="nav-link text-uppercase" to="/user/level-wise-team">
            Level Team
          </Link>
<Link className="nav-link text-uppercase" to="/user/user-claim">
            Claim
          </Link>
          <Link className="nav-link text-uppercase" to="/user/user-claim-history">
            Claim History
          </Link>

        </nav>
      </div>
    </div>
  );
};

export default UserNavbar;
