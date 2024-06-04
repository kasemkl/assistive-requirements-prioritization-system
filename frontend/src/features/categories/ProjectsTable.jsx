import React, { useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
} from "mdb-react-ui-kit";
import "../../styles/table.css";

export default function ReqTable({ projects }) {
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Project-Title</th>
          <th scope="col">Project-Description</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {projects.map((project, index) => (
          <tr key={project.id}>
            <td>
              <p>{project.title}</p>
            </td>
            <td>
              <p>{project.description}</p>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
