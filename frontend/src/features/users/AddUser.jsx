import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

import defaultPhotoUrl from "../../data/img/default_profile_photo.jpg";
import useAxios from "../../hooks/useAxios";

const AddUser = () => {
  const api = useAxios();
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    date_of_birth: "", // Updated property name
    password: "",
    confirmation_password: "",
    profile_photo: "",
  });

  const [imageSrc, setImageSrc] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const updatedFormData = { ...formData, [name]: files ? files[0] : value };
    setFormData(updatedFormData);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
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
      !formData.password
    ) {
      console.log("All fields are required.");
      return;
    }

    try {
      // Wait for the registerUser promise to resolve
      const formDataToSend = new FormData();
      // Append each form data field to formDataToSend
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Check if 'profile_photo' exists and is not an object file
      if (formData.profile_photo && !(formData.profile_photo instanceof File)) {
        formDataToSend.delete("profile_photo");
      }
      const response = await api.post("product-owner-accounts", formDataToSend);
      const data = await response.data;
      console.log(data);
      if (response.status === 201) {
        // console.log(data.message);  // Log the success message
        // setDialogTitle(data.title)
        // setDialogText(data.message)
        // setModalShow(true)
        // setRes(response.status)
        // if(modalShow==false){
        alert(data.message);
      } else {
        alert("an error occurs.");
        console.log(data.message); // Log the error message
        // setDialogTitle(data.title);
        // setDialogText(data.message);
        // setModalShow(true);
        // setRes(response.status);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="Form user-form">
      <form className="add-users" onSubmit={handleSubmit}>
        <fieldset>
          <span className="title">Add User</span>

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
            <p className="passwordError">Password is not strong enough</p>
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
            <p className="passwordError">
              Confirmation password does not match
            </p>
          )}

          <div className="field button sign">
            <button type="submit" className="btn">
              Add User
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AddUser;
