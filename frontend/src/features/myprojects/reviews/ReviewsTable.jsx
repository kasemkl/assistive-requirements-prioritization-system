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

export default function ReviewTable({ reviews, render, setRender }) {
  const api = useAxios();
  console.log(reviews);
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Review-Content</th>
          <th scope="col">Date</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {reviews.map((review, index) => (
          <tr key={`${review.content + "-" + review.date}`}>
            <td>
              <p>{review.content}</p>
            </td>
            <td>
              <p>{review.date}</p>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
