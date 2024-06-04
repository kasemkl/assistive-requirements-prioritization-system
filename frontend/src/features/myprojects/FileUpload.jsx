import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { MDBInput, MDBSpinner } from "mdb-react-ui-kit";
import Modal from "../../ui/Modal"; // Assuming you have a Modal component

const FileUpload = ({ text, endpoint }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState({ title: "", body: "" });
  const { project_id } = useParams();
  const api = useAxios();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ];
    if (!allowedTypes.includes(file.type)) {
      setModalText({
        title: "File Upload Error",
        body: "Only Excel (.xlsx) and CSV (.csv) files are allowed.",
      });
      setShowModal(true);
      return;
    }

    setSelectedFile(file);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || (text === "Reviews" && !fileName)) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      if (text === "Reviews") {
        formData.append("source_name", fileName);
        setModalText({
          title: "Processing",
          body: "Please Wait, This will take a couple of minute....",
        });
        setShowModal(true);
      }
      const response = await api.post(`${endpoint}/${project_id}`, formData);
      const data = await response.data;
      setLoading(false);
      if (response.status === 200) {
        setModalText({ title: "Success", body: data.message });
        setShowModal(true);
      } else {
        setModalText({ title: "Error", body: "An error occurred." });
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
      setModalText({ title: "Error", body: "An error occurred." });
      setShowModal(true);
      setLoading(false);
    }
  };

  return (
    <div className="add-proj-req-form">
      {showModal && (
        <Modal text={modalText} onHide={() => setShowModal(false)} />
      )}
      <div className="add-file">
        <h1>Add {text} File</h1>
        {text === "Reviews" && (
          <div className="mb-2">
            <label>File name</label>
            <MDBInput
              type="text"
              value={fileName}
              onChange={handleFileNameChange}
              className="form-control"
              required
            />
          </div>
        )}
        <div className="mt-2 mb-2">
          <label>Add The File</label>
          <MDBInput
            type="file"
            onChange={handleFileChange}
            className="form-control"
            accept=".xlsx,.csv" // Specify allowed file types
          />
        </div>
        <div className="buttons">
          {loading ? (
            <button className="btn loading-btn btn-primary" disabled>
              <MDBSpinner size="md" role="status" tag="span" className="me-2" />
              Processing...
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleUpload}>
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
