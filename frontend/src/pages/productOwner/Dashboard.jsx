import React, { useEffect, useState } from "react";
import { MDBSpinner } from "mdb-react-ui-kit";
import ProjectCard from "../../features/myprojects/ProjectCard";
import useAxios from "./../../hooks/useAxios";
import Loading from "../../ui/Loading";

const pieChartColors = [
  "var(--chart-color-blue-100)",
  "var(--chart-color-blue-200)",
  "var(--chart-color-blue-300)",
];

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = useAxios();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("projects");
        const data = await response.data.data;
        if (response.status === 200) {
          setProjects(data);
        } else {
          alert("An error occurred while fetching projects.");
        }
      } catch (error) {
        console.log(error);
        alert("An error occurred while fetching projects.");
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
          <ProjectCard key={project.id} project={project} dashboard={true} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
