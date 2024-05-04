import React from "react";
import FileUpload from "../FileUpload";

const AddReviewFile = () => {
  return (
    <div>
      <h1>Add Reviews File</h1>
      <FileUpload endpoint={"reviews"} text={"Reviews"} />
    </div>
  );
};

export default AddReviewFile;
