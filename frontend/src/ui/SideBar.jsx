import React, { useContext, useRef, useState } from "react";
import "../styles/sidebar.css";
import { Link } from "react-router-dom";
import "boxicons";
import AuthContext from "../contexts/AuthContext";
import UserInfoContext from "../contexts/UserInfoContext";
const SideBar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  const { userInfo } = useContext(UserInfoContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { notifications } = {};
  const searchInput = useRef(null);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="logo-details">
        <i className="bx bxl-c-plus-plus icon"></i>
        <div className="logo_name">ReqCraft</div>
        <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
      </div>
      <ul className="nav-list">
        {userInfo.type === 1 ? (
          <>
            <li>
              <Link to="dashboard">
                <i className="bx bxs-dashboard"></i>
                <span className="links_name">Dashboard</span>
              </Link>
              <span className="tooltip">Dashboard</span>
            </li>
            <li>
              <Link to="users">
                <i className="bx bx-user"></i>
                <span className="links_name">Users</span>
              </Link>
              <span className="tooltip">Users</span>
            </li>

            <li>
              <Link to="categories">
                <i className="bx bx-category"></i>
                <span className="links_name">Categories</span>
              </Link>
              <span className="tooltip">Categories</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="dashboard">
                <i className="bx bxs-dashboard"></i>
                <span className="links_name">Dashboard</span>
              </Link>
              <span className="tooltip">Dashboard</span>
            </li>
            <li>
              <Link to="my-projects">
                <i className="bx bx-book-content"></i>
                <span className="links_name">My projects</span>
              </Link>
              <span className="tooltip">My projects</span>
            </li>
            <li>
              <Link to="add-project">
                <i className="bx bx-book-add"></i>
                <span className="links_name">Add Project</span>
              </Link>
              <span className="tooltip">Add Project</span>
            </li>
            <li>
              <Link to="plans">
                <i className="bx bx-award"></i>
                <span className="links_name">plans</span>
              </Link>
              <span className="tooltip">plans</span>
            </li>
          </>
        )}

        <li>
          <Link to="settings">
            <i className="bx bx-cog"></i>
            <span className="links_name">Settings</span>
          </Link>
          <span className="tooltip">Settings</span>
        </li>

        <li className="profile">
          <div className="profile-details">
            <img src={userInfo.profile_photo} alt="profileImg" />
            <div className="name_job">
              <div className="name">{userInfo.first_name}</div>
              <div className="job">
                {parseInt(userInfo.type) === 1
                  ? "System Admin"
                  : "Product Owner"}
              </div>
            </div>
          </div>
          <i className="bx bx-log-out" id="log_out"></i>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
