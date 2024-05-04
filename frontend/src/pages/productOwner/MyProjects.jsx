import React, { useEffect, useState } from "react";
import ProjectCard from "../../features/myprojects/ProjectCard";
import useAxios from "../../hooks/useAxios";

const Projects = [
  { id: 1, title: "project1", description: "description1" },
  { id: 2, title: "project2", description: "description2" },
];

const MyProjects = () => {
  const api = useAxios();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let response = await api.get("projects");
        let data = await response.data.data;
        console.log(data);
        if (response.status === 200) {
          setProjects(data);
        } else {
          alert("error occurs");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>My Projects :</h1>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default MyProjects;
