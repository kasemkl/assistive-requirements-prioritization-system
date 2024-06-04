import React, { useEffect, useState } from "react";
import ProjectCard from "../../features/myprojects/ProjectCard";
import useAxios from "../../hooks/useAxios";
import { MDBSpinner } from "mdb-react-ui-kit";
import Loading from "../../ui/Loading";

const Projects = [
  { id: 1, title: "project1", description: "description1" },
  { id: 2, title: "project2", description: "description2" },
];

const MyProjects = () => {
  const api = useAxios();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("projects");
        const data = response.data.data;
        console.log(data);
        if (response.status === 200) {
          setProjects(data);
        } else {
          alert("error occurs");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (projects.length === 0) {
    return <p>No projects available.</p>;
  }

  return (
    <div>
      <h1>My Projects :</h1>
      <div className="cards">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
