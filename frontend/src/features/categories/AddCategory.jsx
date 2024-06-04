import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Modal from "../../ui/Modal";

const AddCategory = () => {
  const api = useAxios();
  const [categoryName, setCategoryName] = useState("");
  const [categoryPhoto, setCategoryPhoto] = useState(null);
  const [modalText, setModalText] = useState({ title: "", body: "" });
  const [showModal, setShowModal] = useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "category_name") {
      setCategoryName(value);
    } else if (name === "category_photo") {
      const file = files[0];
      if (file && file.type !== "image/jpeg") {
        setModalText({
          title: "File Upload Error",
          body: "Only JPEG files are allowed.",
        });
        setShowModal(true);
        return;
      }
      setCategoryPhoto(file);
    }
  };

  const handleSubmit = async () => {
    // Validate category_name field
    if (!categoryName) {
      setModalText({
        title: "Category Name Error",
        body: "Category name is required.",
      });
      setShowModal(true);
      return;
    }

    if (!/^[a-zA-Z]+$/.test(categoryName)) {
      setModalText({
        title: "Category Name Error",
        body: "Category name must contain only letters.",
      });
      setShowModal(true);
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
        setModalText({ title: "Category Adding", body: response.data.message });
        setShowModal(true);
      } else {
        setModalText({ title: "Category Adding", body: response.data.message });
        setShowModal(true);
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
      {showModal && (
        <Modal
          text={modalText}
          onHide={() => {
            setShowModal(false);
            setModalText({ title: "", body: "" });
          }}
        />
      )}
    </div>
  );
};

export default AddCategory;
