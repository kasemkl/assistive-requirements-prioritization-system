// Login.js
import React, { useContext, useState } from "react";
import "../../styles/form.css";
import { Link } from "react-router-dom";
import AuthContext from "./../../contexts/AuthContext";
import { MDBSpinner } from "mdb-react-ui-kit";
import Modal from "../../ui/Modal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useContext(AuthContext); // Corrected
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState({ title: "Login", body: "" });
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setModalText({ ...modalText, body: "a field is missing" });
      setShowModal(true);
      return;
    }
    setLoading(true);
    const formData = {
      email: email,
      password: password,
    };
    // loginUser(formData)
    const response = await loginUser(formData);
    setLoading(false);
    if (response.status !== 200) {
      console.log(response.data);
      setShowModal(true);
      setModalText({ title: "Login Failed", body: response.data.detail });
    }
  };
  console.log(loading);
  return (
    <>
      {showModal && (
        <Modal
          text={modalText}
          onHide={() => {
            setShowModal(false);
            setModalText({ title: "Login", body: "" });
          }}
        />
      )}
      <div className="Form">
        <form onSubmit={handleLogin} className="login">
          <fieldset>
            <span className="title">Log in</span>
            <div className="field">
              <label>
                Email <sup></sup>
              </label>
              <input
                type="email"
                placeholder="Type your Email..."
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="bx bxs-id-card"></i>
            </div>
            <div className="field">
              <label>Password </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Type your password name..."
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="bx bx-lock-alt"></i>
              <div className="show-hide" onClick={handleTogglePassword}>
                {showPassword ? (
                  <i className="bx bx-hide"></i>
                ) : (
                  <i className="bx bx-show"></i>
                )}
              </div>
            </div>
            <div className="field button">
              {loading ? (
                <button className="btn loading-btn" disabled>
                  <MDBSpinner
                    size="md"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                  Loading...
                </button>
              ) : (
                <button type="submit" className="btn">
                  Login
                </button>
              )}
            </div>
            <div className="login-signup">
              <span className="text">
                Not a member?
                <Link to="/sign-up" className="text login-link">
                  Sign Up Now
                </Link>
              </span>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default Login;
