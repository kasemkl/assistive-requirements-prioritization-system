import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import "../../styles/settings.css";
import AuthContext from "../../contexts/AuthContext";
import UserInfoContext from "../../contexts/UserInfoContext";

const Profile = () => {
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const { userInfo } = useContext(UserInfoContext);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_photo: null, // Use null instead of an empty string for file upload
  });
  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
    confirmation_password: "",
  });
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    setFormData({
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email,
      profile_photo: userInfo.profile_photo,
    });
  }, [userInfo]);
  console.log(userInfo);
  useEffect(() => {
    setImageSrc(userInfo.profile_photo);
  }, [userInfo]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);

    setFormData({
      ...formData,
      profile_photo: file, // Set the file object directly
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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

  const handleUpdateUserInfo = async () => {
    try {
      const formDataToSend = new FormData();
      // Append each form data field to formDataToSend
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Check if 'profile_photo' exists and is not an object file
      if (formData.profile_photo && !(formData.profile_photo instanceof File)) {
        formDataToSend.delete("profile_photo");
      }
      for (var pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      const response = await api.patch(`user-information`, formDataToSend);
      console.log(response.data);
      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert("error occurs.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await api.put(`user-password`, passwords);
      console.log(response.data);
      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert("error occurs.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile">
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
