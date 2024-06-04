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
import Modal from "../../ui/Modal";

export default function CategoryCard({ category, Render, setRender }) {
  const { baseURL } = useContext(AuthContext);
  const api = useAxios();
  const [modalText, setModalText] = useState({ title: "", body: "" });
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await api.delete(`single-category/${category.id}`);
      const data = await response.data;
      console.log(data);
      setModalText({
        title: "Success",
        body: "Category deleted successfully.",
      });
      setShowModal(true);
    } catch (error) {
      console.log(error);
      setModalText({
        title: "Error",
        body: "An error occurred while deleting the category.",
      });
      setShowModal(true);
    }
  };

  return (
    <div>
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
      {showModal && (
        <Modal
          text={modalText}
          onHide={() => {
            setShowModal(false);
            setRender(!Render);
            setModalText({ title: "", body: "" });
          }}
        />
      )}
    </div>
  );
}
