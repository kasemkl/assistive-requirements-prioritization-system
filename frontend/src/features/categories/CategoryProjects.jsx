import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ProjectsTable from "./ProjectsTable";
const CategoryProjects = () => {
  const param = useParams();
  const category_id = param.category_id;
  const [projects, setProjects] = useState([]);
  const api = useAxios();
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`projects-category/${category_id}`);
        const data = response.data;
        console.log(data);
        if (response.status === 200) setProjects(data.projects);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, []);
  return (
    <div>
      <h1>projects of {category_id}</h1>
      <ProjectsTable projects={projects} />
    </div>
  );
};

export default CategoryProjects;
