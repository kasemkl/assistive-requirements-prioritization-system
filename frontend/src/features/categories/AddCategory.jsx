import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

const AddCategory = () => {
  const api = useAxios();
  const [categoryName, setCategoryName] = useState("");
  const [categoryPhoto, setCategoryPhoto] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category_name") {
      setCategoryName(value);
    } else if (name === "category_photo") {
      setCategoryPhoto(e.target.files[0]);
    }
    // Clear errors for the field being edited
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async () => {
    // Validate category_name field
    if (!categoryName) {
      setErrors({
        ...errors,
        category_name: "Category name is required",
      });
      return;
    }

    // Here you can handle the submission of the form data
    console.log(categoryName, categoryPhoto);
    try {
      // Example of sending category name and photo as FormData
      let formData = new FormData();
      formData.append("category_name", categoryName);
      formData.append("category_photo", categoryPhoto);

      let response = await api.post("categories", formData);
      let data = await response.data;
      console.log(data);
      if (response.status === 201) {
        alert(response.data.message);
      } else {
        alert("An error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Add Category</h1>
      <div className="add-proj-req-form">
        <div className="add-requirement">
          <div className="field cat-input">
            <label>Category Name</label>
            <input
              type="text"
              className="form-control"
              name="category_name"
              value={categoryName}
              onChange={handleChange}
              required
            />
            {errors.category_name && (
              <div className="error">{errors.category_name}</div>
            )}
          </div>
          <div className="field cat-input">
            <label>Add category photo</label>
            <input
              type="file"
              onChange={handleChange}
              name="category_photo"
              className="form-control"
            />
          </div>
          <div className="buttons">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
