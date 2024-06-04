import React, { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { MDBSpinner } from "mdb-react-ui-kit";
import Modal from "../../../ui/Modal";

const AddRequirement = () => {
  const api = useAxios();
  const { project_id } = useParams();
  const [formData, setFormData] = useState({
    requirement_text: "",
    requirements_priority: "low",
    project_id: project_id,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState({ title: "", body: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async () => {
    if (!formData.requirement_text) {
      setErrors({
        ...errors,
        requirement_text: "Requirement text is required",
      });
      return;
    }

    console.log(formData);
    setLoading(true);
    try {
      let response = await api.post("add-req", formData);
      let data = await response.data;
      console.log(data);
      setLoading(false);
      if (response.status === 201) {
        setModalText({ title: "Success", body: response.data.message });
        setShowModal(true);
      } else {
        setModalText({ title: "Error", body: "An error occurred." });
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setModalText({ title: "Error", body: "An error occurred." });
      setShowModal(true);
    }
  };

  return (
    <div className="container">
      {showModal && (
        <Modal text={modalText} onHide={() => setShowModal(false)} />
      )}
      <h1>Add Requirement</h1>
      <div className="add-proj-req-form">
        <div className="add-requirement">
          <div className="field description">
            <label>Requirement Text</label>
            <input
              type="text"
              className="form-control"
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
              className="form-control"
              name="requirements_priority"
              value={formData.requirements_priority}
              onChange={handleChange}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="buttons">
            {loading ? (
              <button className="btn loading-btn" disabled>
                <MDBSpinner
                  size="md"
                  role="status"
                  tag="span"
                  className="me-2"
                />
                Processing...
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleSubmit}>
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRequirement;
