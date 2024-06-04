import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import "../../styles/settings.css";
import AuthContext from "../../contexts/AuthContext";
import UserInfoContext from "../../contexts/UserInfoContext";
import Loading from "../../ui/Loading";
import Modal from "../../ui/Modal";

const Profile = () => {
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const { userInfo } = useContext(UserInfoContext);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState({
    title: "Profile Update",
    body: "",
  });
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_photo: null,
  });
  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
    confirmation_password: "",
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setFormData({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        profile_photo: userInfo.profile_photo,
      });
      setImageSrc(userInfo.profile_photo);
      setLoading(false);
    };

    fetchData();
  }, [userInfo]);

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

  const validateName = (name) => {
    return /^[a-zA-Z]+$/.test(name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "first_name" || name === "last_name") {
      if (!validateName(value)) {
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const isStrongPassword = () => {
    const hasLetter = /[a-zA-Z]/.test(passwords.new_password);
    const hasDigit = /\d/.test(passwords.new_password);
    return passwords.new_password.length > 7 && hasLetter && hasDigit;
  };

  const isPasswordMatch = () => {
    return (
      passwords.new_password &&
      passwords.confirmation_password &&
      passwords.new_password === passwords.confirmation_password
    );
  };

  const handleUpdateUserInfo = async () => {
    if (errors.first_name || errors.last_name) {
      setModalText({
        title: "Profile Update",
        body: "Please fix the errors before submitting.",
      });
      setShowModal(true);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await api.patch(`user-information`, formDataToSend);
      if (response.status === 200) {
        setModalText({ title: "Profile Update", body: response.data.message });
      } else {
        setModalText({ title: "Profile Update", body: "An error occurred." });
      }
      setShowModal(true);
    } catch (error) {
      console.log(error);
      setModalText({ title: "Profile Update", body: "An error occurred." });
      setShowModal(true);
    }
  };

  const handleUpdatePassword = async () => {
    if (!isStrongPassword() || !isPasswordMatch()) {
      setModalText({
        title: "Password Update",
        body: "Password must be strong and match the confirmation.",
      });
      setShowModal(true);
      return;
    }
    try {
      const response = await api.put(`user-password`, passwords);
      if (response.status === 200) {
        setModalText({ title: "Password Update", body: response.data.message });
      } else {
        setModalText({ title: "Password Update", body: response.data.detail });
      }
      setShowModal(true);
    } catch (error) {
      console.log(error);
      setModalText({
        title: "Password Update",
        body: error.response.data.detail,
      });
      setShowModal(true);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="profile">
      {showModal && (
        <Modal
          text={modalText}
          onHide={() => {
            setShowModal(false);
            setModalText({ title: "Profile Update", body: "" });
          }}
        />
      )}
      <div className="container">
        {!userInfo.first_name ? (
          <p>loading info....</p>
        ) : (
          <div className="row gutters">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="account-settings">
                    <div className="user-profile">
                      <div className="user-avatar">
                        <img
                          src={imageSrc}
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
                      <h5 className="user-name">
                        {formData.first_name + " " + formData.last_name}
                      </h5>
                      <h6 className="user-email">{formData.email}</h6>
                    </div>
                    <div className="about">
                      <h5>About</h5>
                      <p>
                        {userInfo.type === 1 ? "SYSTEM ADMIN" : "PRODUCT OWNER"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body">
                  <form>
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-2 text-primary">Personal Details</h6>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="first_name">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            placeholder="Enter first name"
                            onChange={handleInputChange}
                            value={formData.first_name}
                          />
                          {errors.first_name && (
                            <p className="error">{errors.first_name}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="last_name">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            name="last_name"
                            placeholder="Enter last name"
                            onChange={handleInputChange}
                            value={formData.last_name}
                          />
                          {errors.last_name && (
                            <p className="error">{errors.last_name}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="eMail">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="eMail"
                            name="email"
                            placeholder="Enter email ID"
                            onChange={handleInputChange}
                            value={formData.email}
                          />
                        </div>
                      </div>

                      <div className="text-right">
                        <button type="button" className="btn btn-secondary">
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ marginLeft: "5px", marginTop: "10px" }}
                          onClick={handleUpdateUserInfo}
                        >
                          Update Photo and Information
                        </button>
                      </div>

                      <hr className="my-4" />

                      <div className="form-group">
                        <label htmlFor="inputPassword4">Old Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputPassword4"
                          name="old_password"
                          value={passwords.old_password}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputPassword5">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputPassword5"
                          name="new_password"
                          value={passwords.new_password}
                          onChange={handlePasswordChange}
                        />
                        {!isStrongPassword() && passwords.new_password && (
                          <p className="error">Password is not strong enough</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputPassword6">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputPassword6"
                          name="confirmation_password"
                          value={passwords.confirmation_password}
                          onChange={handlePasswordChange}
                        />
                        {!isPasswordMatch() &&
                          passwords.confirmation_password && (
                            <p className="error">
                              Confirmation password does not match
                            </p>
                          )}
                      </div>
                    </div>

                    <div className="text-right">
                      <button type="button" className="btn btn-secondary">
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginLeft: "5px" }}
                        onClick={handleUpdatePassword}
                        disabled={!isStrongPassword() || !isPasswordMatch()}
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
