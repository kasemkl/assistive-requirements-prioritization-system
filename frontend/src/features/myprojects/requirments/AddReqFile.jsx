import React from "react";
import FileUpload from "../FileUpload";

const AddReqFile = () => {
  return (
    <div>
      <h1>Add Requirments File</h1>
      <FileUpload endpoint={"requirements-file"} text={"Requirements"} />
    </div>
  );
};

export default AddReqFile;
