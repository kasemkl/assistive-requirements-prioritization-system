import React, { useContext } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../contexts/AuthContext";

export default function UsersTable({ users, render, setRender }) {
  const api = useAxios();
  const { baseURL } = useContext(AuthContext);
  const handleDeleteUser = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user ?",
    );

    if (!confirm) return;
    try {
      const response = await api.delete(`single-user/${id}`);
      const data = await response.data;
      console.log(data);
      setRender(!render);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Email</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Birth Date</th>
          <th scope="col">Number Of Projects</th>
          <th scope="col">Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src={`${baseURL}${user.profile_photo}`}
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p
                    className="mb-0"
                    style={{ color: "var(--color-grey-300)" }}
                  >
                    {user.email}
                  </p>
                </div>
              </div>
            </td>
            <td>
              <p className="fw-bold mb-1">
                {user.first_name} {user.last_name}
              </p>
            </td>
            <td>
              <p className="fw-normal mb-1">
                {user.type === 1 ? "System Admin" : "Product Owner"}
              </p>
            </td>
            <td>
              <p className="fw-normal mb-1">{user.date_of_birth}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{user.number_of_projects}</p>
            </td>

            <td>
              <MDBBtn
                color="danger"
                size="sm"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </MDBBtn>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
