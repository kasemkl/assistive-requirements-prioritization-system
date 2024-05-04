import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/nav.css";
import AuthContext from "../contexts/AuthContext";
import UserInfoContext from "../contexts/UserInfoContext";

const Navbar = () => {
  const { logoutUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const { userInfo } = useContext(UserInfoContext);
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    profile_photo: "",
    type: "",
  });

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);
  useEffect(() => {
    if (user) {
      setUsername(`${user.first_name} ${user.last_name}`);
    }
  }, [user]);
  console.log(user);
  const handleLogout = () => {
    logoutUser();
    setUser({
      email: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      profile_photo: "",
      type: "",
    });
  };
  return (
    <nav className="navbar">
      <div className="side-brand">
        <Link to="/" className="navbar-brand">
          ReqCraft
        </Link>
      </div>
      <div className="navbar-list" id="navbarSupportedContent">
        <ul className="nav-list ml-auto">
          <li>
            <Link to="/about-us" className="nav-link">
              About us
            </Link>
          </li>
          {!user.email ? (
            <li>
              <Link to="/login" className="nav-link">
                Sign in
              </Link>
            </li>
          ) : (
            <>
              <li className="username">{username}</li>
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                  }}
                >
                  <i className="bx bx-log-in"></i>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
