import React, { useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
} from "mdb-react-ui-kit";
import "../../../styles/table.css";
import useAxios from "../../../hooks/useAxios";

export default function ReqTable({ requirements, render, setRender }) {
  const api = useAxios();
  const [editableRow, setEditableRow] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  const handleEditClick = (id, index) => {
    setEditableRow(id);
    setEditedValues(requirements[index]);
  };

  const handleInputChange = (event, field) => {
    const newValue = event.target.value;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: newValue,
    }));
  };

  const handleSaveClick = async (id) => {
    try {
      let response = await api.put(`single-req/${id}`, editedValues);
      if (response.status === 200) {
        setRender(!render);
        alert("Requirement updated successfully");
      } else {
        alert("Error occurs");
      }
    } catch (error) {
      console.log(error);
    }
    setEditableRow(null);
    setEditedValues({});
  };

  const handleDeleteClick = async (id) => {
    try {
      let response = await api.delete(`single-req/${id}`);
      if (response.status === 204) {
        setRender(!render);
        alert("Requirement deleted successfully");
      } else {
        alert("Error occurs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Req-ID</th>
          <th scope="col">Req-Description</th>
          <th scope="col">Req-Priority</th>
          <th scope="col">Addition Date</th>
          <th scope="col">Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {requirements.map((requirement, index) => (
          <tr key={requirement.id}>
            <td>
              <p>{requirement.id}</p>
            </td>
            <td>
              {editableRow === requirement.id ? (
                <MDBInput
                  style={{ backgroundColor: "white" }}
                  type="text"
                  value={editedValues.requirement_text}
                  onChange={(event) =>
                    handleInputChange(event, "requirement_text")
                  }
                />
              ) : (
                <p>{requirement.requirement_text}</p>
              )}
            </td>
            <td>
              {editableRow === requirement.id ? (
                <select
                  className="form-select"
                  value={editedValues.requirements_priority}
                  onChange={(event) =>
                    handleInputChange(event, "requirements_priority")
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              ) : (
                <p>{requirement.requirements_priority}</p>
              )}
            </td>
            <td>
              <p>{requirement.addition_date}</p>
            </td>
            <td>
              {editableRow === requirement.id ? (
                <MDBBtn
                  color="success"
                  size="sm"
                  onClick={() => handleSaveClick(requirement.id)}
                >
                  Save
                </MDBBtn>
              ) : (
                <>
                  <MDBBtn
                    color="link"
                    size="sm"
                    onClick={() => handleEditClick(requirement.id, index)}
                  >
                    Edit
                  </MDBBtn>
                  <MDBBtn
                    color="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(requirement.id)}
                  >
                    Delete
                  </MDBBtn>
                </>
              )}
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
