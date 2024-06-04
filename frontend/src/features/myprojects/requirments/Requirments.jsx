import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReqTable from "./ReqTable";
import "../../../styles/requiremnts.css";
import useAxios from "../../../hooks/useAxios";

const generateData = () => {
  const data = [];
  const numEntries = 10; // Number of entries in the table

  for (let i = 1; i <= numEntries; i++) {
    const entry = {
      id: `REQ-${i}`,
      title: `Title ${i}`,
      priority: Math.floor(Math.random() * 5) + 1, // Random priority between 1 and 5
      description: `description ${i}`, // Randomly open or closed state
    };
    data.push(entry);
  }

  return data;
};

// Random data array
const randomData = generateData();

const Requirments = () => {
  const param = useParams();
  const { project_title, project_id } = param;
  const api = useAxios();
  const [requirments, setRequirments] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchRequirments = async () => {
      console.log(project_id);
      try {
        let response = await api.get(`requirements/${project_id}`);
        let data = await response.data;
        console.log(data);
        if (response.status === 200) {
          setRequirments(data);
        } else {
          alert("error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequirments();
  }, [render]);

  return (
    <div className="requirments">
      <h1>Requirments of {project_title}</h1>
      <Link to={`add-requirments`} className="add-req">
        Add
      </Link>
      <div className="requirments-table">
        <ReqTable
          requirements={requirments}
          setRender={setRender}
          render={render}
        />
      </div>
    </div>
  );
};

export default Requirments;
