import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
} from "mdb-react-ui-kit";
import "../../../styles/table.css";
import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useParams } from "react-router-dom";

const SourcesList = () => {
  const param = useParams();
  const project_id = parseInt(param.project_id);
  const [sources, setSources] = useState([]);
  const api = useAxios();
  const [render, setRender] = useState(false);
  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await api.get(`sources/${project_id}`);
        const data = await response.data.data;
        console.log(data);
        setSources(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSources();
  }, [render]);

  const handleDeleteClick = async (id) => {
    try {
      let response = await api.delete(`review-source/${id}`);
      const data = await response.data;
      console.log(data);
      if (response.status === 204) {
        setRender(!render);
        alert(data.message);
      } else {
        alert("Error occurs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Sources:</h2>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Source Name</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {sources.map((source, index) => (
            <tr key={`${source.source_name + index}`}>
              <td>
                <p>{source.source_name}</p>
              </td>
              <td>
                <MDBBtn
                  color="danger"
                  size="sm"
                  onClick={() => handleDeleteClick(source.id)}
                >
                  Delete
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default SourcesList;
