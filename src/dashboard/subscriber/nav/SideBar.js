import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../functions/auth";

const SideBar = () => {
  const {
    user: { _id, fullName, email },
  } = isAuthenticated();
  return (
    <>
      <div className="col-xl-3 col-lg-3 col-md-4">
        <aside className="sidebar">
          <div className="dashboard-side">
            <div className="dashboard-head">
              <div className="dashboard-profile">
                <img
                  src="img/user_profile.jpg"
                  width="110px"
                  height="100px"
                  alt="profile image"
                />
                <div className="profile-content text-white" style={{color: "#fff"}}>
                  <span className="pro-name">{fullName}</span>
                  <span className="pro-number">{email}</span>
                </div>
              </div>
            </div>
            <div className="dashboard-menu">
              <ul>
                <li className="active">
                  <Link to="/dashboard">
                    <i className="ti-dashboard"></i>Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/investment-history">
                    <i className="ti-new-window"></i>Investment History
                  </Link>
                </li>
                <li>
                  <Link to="/investment">
                    <i className="ti-new-window"></i>Deposite
                  </Link>
                </li>
                <li>
                  <Link to="/investment-history">
                    <i className="ti-new-window"></i>Withdraw
                  </Link>
                </li>
                <hr />
                <li>
                  <Link to="/dashboard-user-info">
                    <i className="ti-settings"></i>Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default SideBar;
