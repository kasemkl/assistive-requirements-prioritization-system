// import React from "react";
import "../../styles/project_card.css";
import { Link } from "react-router-dom";

// const ProjectCard = ({ project }) => {
//   const { id, title, description } = project;
//   console.log(id);
//   return (
//     <div className="project-card">
//       <h4>{title}</h4>
//       <div className="project-card-inner">
//         <p>Description: {description}</p>
//       </div>
//       <div className="links">
//         <Link to={`${id}/requirements`} className="link">
//           Requirements
//         </Link>
//         <Link to={`${id}/reviews`} className="link">
//           Reviews
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;

import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function ProjectCard({ project, dashboard = false }) {
  const { id, title, description } = project;
  return (
    <MDBCard className="project-card">
      <MDBCardBody>
        <div className="card-partion">
          <div>
            <MDBCardTitle tag={"h2"} className="title">
              {title}
            </MDBCardTitle>
            <MDBCardText className="project-card-inner">
              {description}
            </MDBCardText>
          </div>
          <div className="links">
            {!dashboard ? (
              <>
                <Link
                  to={`${id}/${title}/requirements`}
                  className="btn btn-primary link"
                >
                  Requirements
                </Link>
                <Link
                  to={`${id}/${title}/reviews`}
                  className="btn btn-primary link"
                >
                  Reviews
                </Link>
              </>
            ) : (
              <Link
                to={`${project.id}/${title}/dashboard`}
                className="btn btn-primary link"
              >
                View Dashboard
              </Link>
            )}
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}
