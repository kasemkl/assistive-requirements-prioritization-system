import React from "react";
import "../styles/project_card.css";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const { id, title, description } = project;
  console.log(id);
  return (
    <div className="project-card">
      <h4>{title}</h4>
      <div className="project-card-inner">
        <p>Description: {description}</p>
      </div>
      <div className="links">
        <Link to={`${id}/requirements`} className="link">
          Requirements
        </Link>
        <Link to={`${id}/reviews`} className="link">
          Reviews
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
