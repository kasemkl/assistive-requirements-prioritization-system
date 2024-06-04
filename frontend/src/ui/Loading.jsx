import { MDBSpinner } from "mdb-react-ui-kit";
import React from "react";

const Loading = () => {
  return (
    <div className="loading-spinner">
      <MDBSpinner
        grow
        color="primary"
        style={{ width: "5rem", height: "5rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
};

export default Loading;
