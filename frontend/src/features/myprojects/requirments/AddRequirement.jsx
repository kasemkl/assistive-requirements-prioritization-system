import React, { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useParams } from "react-router-dom";

const AddRequirement = () => {
  const api = useAxios();
  const param = useParams();
  const project_id = parseInt(param.id);
  const [formData, setFormData] = useState({
    requirement_text: "",
    requirements_priority: "low", // Default priority is set to "low"
    project_id: project_id,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear errors for the field being edited
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async () => {
    // Validate requirement_text field
    if (!formData.requirement_text) {
      setErrors({
        ...errors,
        requirement_text: "Requirement text is required",
      });
      return;
    }

    // Here you can handle the submission of the form data
    console.log(formData);
    try {
      let response = await api.post("add-req", formData);
      let data = await response.data;
      console.log(data);
      if (response.status === 201) {
        alert(response.data.message);
      } else {
        alert("an error occurs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Add Requirement</h1>
      <div className="add-proj-req-form">
        <div className="add-requirement">
          <div className="field description">
            <label>Requirement Text</label>
            <input
              type="text"
              className=""
              name="requirement_text"
              value={formData.requirement_text}
              onChange={handleChange}
              required
            />
            {errors.requirement_text && (
              <div className="error">{errors.requirement_text}</div>
            )}
          </div>
          <div className="field priority">
            <label>Priority</label>
            <select
              className=""
              name="requirements_priority"
              value={formData.requirements_priority}
              onChange={handleChange}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.requirements_priority && (
              <div className="error">{errors.requirements_priority}</div>
            )}
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

export default AddRequirement;
