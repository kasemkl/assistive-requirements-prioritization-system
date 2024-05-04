import { Link } from "react-router-dom";
import React from "react";

const AddReqWay = () => {
  return (
    <div className="container">
      <h2>Choose The Way Of Adding Requirments:</h2>
      <div className="req-way">
        <Link to="form" className="req-way-link">
          <i className="bx bxs-plus-square"></i>
          <p>Form</p>
        </Link>

        <Link to="file" className="req-way-link">
          <i className="bx bxs-file-plus"></i>
          <p>Source File</p>
        </Link>
      </div>
    </div>
  );
};

export default AddReqWay;
