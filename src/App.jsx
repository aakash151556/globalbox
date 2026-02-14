import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";
import "../public/css/style.css";
import Home from "./home/pages/Index";
import AboutUs from "./home/pages/AboutUs";
import ContactUs from "./home/pages/ContactUs";
import BussinessPlan from "./home/pages/BussinessPlan";

import Register from "./home/pages/Register";
import AdminLogin from "./home/pages/AdminLogin";
import HomeLayout from "./home/layout/Layout";
import TokenWhitelist from "./home/pages/TokenWhitelist";
import UserLayout from "./user/layout/UserLayout";
import UserDashboard from "./user/pages/UserDashboard";
import UserStakeTopup from "./user/pages/UserStakeTopup";
import UserStakeHistory from "./user/pages/UserStakeHistory";
import UserReferralTeam from "./user/pages/UserReferralTeam";
import UserLevelWiseTeam from "./user/pages/UserLevelWiseTeam";
import UserLevelTeam from "./user/pages/UserLevelTeam";
import UserClaim from "./user/pages/UserClaim";
import UserClaimHistory from "./user/pages/UserClaimHistory";

import AdminLayout from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminStakeTopup from "./admin/pages/AdminStakeTopup";
import UserList from "./admin/pages/UserList";
import SendTokenToContract from "./admin/pages/SendTokenToContract";
import FundReceiverApproval from "./admin/pages/FundReceiverApproval";
import ClaimLevelApproval from "./admin/pages/ClaimLevelApproval";
import ChangePrice from "./admin/pages/ChangePrice";
import AdminTeamBussiness from "./admin/pages/AdminTeamBussiness";

import { connectWallet } from "./utils/connectWallet";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import Web3Context from "./Context/Web3Context";

export default function App() {
 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <AboutUs /> },
        { path: "contact", element: <ContactUs /> },
        { path: "bussiness-plan", element: <BussinessPlan /> },
        { path: "register", element: <Register /> },
        { path: "admin-login", element: <AdminLogin /> },
        { path: "token-white-list", element: <TokenWhitelist /> },
      ],
    },
    {
      path: "/user",
      element: (
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <UserDashboard /> },
        { path: "stake-topup", element: <UserStakeTopup /> },
        { path: "stake-history", element: <UserStakeHistory /> },
        { path: "referral-team", element: <UserReferralTeam /> },
        { path: "level-wise-team", element: <UserLevelWiseTeam /> },
        { path: "level-team", element: <UserLevelTeam /> },
        { path: "user-claim", element: <UserClaim /> },
        { path: "user-claim-history", element: <UserClaimHistory /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <AdminProtectedRoute>
          <AdminLayout />
        </AdminProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "token-transfer-to-contract", element: <SendTokenToContract /> },
        { path: "fund-receiver-approval", element: <FundReceiverApproval /> },
        { path: "claim-reciever-approval", element: <ClaimLevelApproval /> },
        { path: "user-list", element: <UserList /> },
        { path: "staking-by-admin", element: <AdminStakeTopup /> },
        { path: "change-price", element: <ChangePrice /> },
        { path: "team-bussiness-list", element: <AdminTeamBussiness /> },
       
      ],
    }
  ]);

  return (

      <RouterProvider router={router} />

  );
}
