import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "./../../hooks/useAxios";

const FileUpload = ({ text, endpoint }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const param = useParams();
  const api = useAxios();
  console.log(param);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile === null) return;
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.post(`${endpoint}/${param.id}`, formData);
      const data = await response.data;
      console.log(data);
      if (response.status === 200) {
        alert(data.message);
      } else {
        alert("an error occurs.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-proj-req-form">
      <div className="add-file">
        <h1>Add {text} File</h1>
        <div className="">
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <div className="buttons">
          <button className="btn btn-primary" onClick={handleUpload}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
