import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import defaultPhotoUrl from "../../data/img/default_profile_photo.jpg";
import "../../styles/form.css";
import Modal from "../../ui/Modal";
import { MDBSpinner } from "mdb-react-ui-kit";

const SignUp = () => {
  const { registerUser, loginUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState({ title: "", body: "" });
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    password: "",
    confirmation_password: "",
    profile_photo: null,
  });

  const [imageSrc, setImageSrc] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const updatedFormData = { ...formData, [name]: files ? files[0] : value };

    if (name === "first_name" || name === "last_name") {
      if (!/^[a-zA-Z]*$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Only letters are allowed",
        }));
        return;
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }

    setFormData(updatedFormData);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type !== "image/jpeg") {
      setModalText({
        title: "File Upload Error",
        body: "Only JPEG files are allowed.",
      });
      setShowModal(true);
      return;
    }
    const reader = new FileReader();

    reader.onload = function (e) {
      setImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);

    setFormData({
      ...formData,
      profile_photo: file,
    });
  };

  const isStrong = () => {
    const hasLetter = /[a-zA-Z]/.test(formData.password);
    const hasDigit = /\d/.test(formData.password);
    return formData.password.length > 7 && hasLetter && hasDigit;
  };

  const isMatch = () => {
    return (
      formData.password &&
      formData.confirmation_password &&
      formData.password === formData.confirmation_password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate that required fields are not empty
    if (
      !formData.email ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.password ||
      !formData.date_of_birth
    ) {
      setModalText({ title: "Sign Up", body: "All fields are required." });
      setShowModal(true);
      return;
    }
    setLoading(true);
    try {
      const response = await registerUser(formData);
      const data = await response.json();
      console.log(data);
      if (response.status === 201) {
        loginUser(formData);
      } else {
        console.log(data.message);
        setModalText({ title: "Sign Up", body: data.message });
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
    setLoading(false);
  };

  return (
    <div className="Form">
      {showModal && (
        <Modal
          text={modalText}
          onHide={() => {
            setShowModal(false);
          }}
        />
      )}
      <form className="sign-up" onSubmit={handleSubmit}>
        <fieldset>
          <span className="title">Sign Up</span>

          <div className="avatar avatar-xl">
            <img
              src={imageSrc ? imageSrc : defaultPhotoUrl}
              alt="..."
              className="avatar-img rounded-circle"
            />
            <div className="change-photo">
              <label className="" htmlFor="customFile">
                Change Photo
              </label>
              <input
                type="file"
                className="form-control d-none"
                id="customFile"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="field">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your Email..."
              value={formData.email}
              onChange={handleInputChange}
            />
            <i className="bx bxs-id-card"></i>
          </div>

          <div className="field">
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter your first name..."
              value={formData.first_name}
              onChange={handleInputChange}
            />
            {errors.first_name && (
              <p className="error ml-70" style={{ marginLeft: "25%" }}>
                {errors.first_name}
              </p>
            )}
            <i className="bx bxs-user-detail"></i>
          </div>

          <div className="field">
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              placeholder="Enter your last name..."
              value={formData.last_name}
              onChange={handleInputChange}
            />
            {errors.last_name && (
              <p className="error" style={{ marginLeft: "25%" }}>
                {errors.last_name}
              </p>
            )}
            <i className="bx bxs-user-detail"></i>
          </div>

          <div className="field">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="date_of_birth"
              placeholder="Enter your birth date..."
              value={formData.date_of_birth}
              onChange={handleInputChange}
            />
            <i className="bx bx-calendar"></i>
          </div>

          <div className="field">
            <label>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter the password..."
              value={formData.password}
              onChange={handleInputChange}
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
          {!isStrong() && formData.password && (
            <p className="error">Password is not strong enough</p>
          )}

          <div className="field">
            <label>Confirmation Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmation_password"
              placeholder="Enter confirmation password..."
              value={formData.confirmation_password}
              onChange={handleInputChange}
            />
            <i className="bx bx-lock-alt"></i>
          </div>
          {!isMatch() && formData.confirmation_password && (
            <p className="error">Confirmation password does not match</p>
          )}

          <div className="field button sign">
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
              <button
                type="submit"
                className="btn"
                disabled={!isStrong() || !isMatch()}
              >
                Sign up
              </button>
            )}
          </div>
          <div className="login-signup">
            <span className="text">
              Already a member?
              <Link to="/login" className="text login-link">
                Login Now
              </Link>
            </span>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
