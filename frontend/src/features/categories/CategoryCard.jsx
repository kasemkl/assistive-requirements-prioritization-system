import React, { useContext, useState } from "react";
import useAxios from "./../../hooks/useAxios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBInput,
} from "mdb-react-ui-kit";
import AuthContext from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  const { baseURL } = useContext(AuthContext);
  const api = useAxios();
  console.log(category);
  const handleDelete = async () => {
    try {
      const response = await api.delete(`single-category/${category.id}`);
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MDBCard className="category">
      <MDBRipple
        rippleColor="light"
        rippleTag="div"
        className="bg-image hover-overlay"
      >
        <MDBCardImage src={`${baseURL}${category.photo}`} fluid alt="..." />
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{category.category_name}</MDBCardTitle>
        <Link
          to={`${category.id}/projects`}
          className=" cat-btn btn btn-primary"
          style={{ width: "100%" }}
        >
          Preview Projects
        </Link>
        <MDBBtn
          onClick={handleDelete}
          className="cat-btn btn-danger"
          style={{ width: "100%" }}
        >
          Delete
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}
