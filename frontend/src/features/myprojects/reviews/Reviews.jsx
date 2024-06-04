import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReqTable from "../requirments/ReqTable";
import "../../../styles/requiremnts.css";
import useAxios from "../../../hooks/useAxios";
import ReviewTable from "./ReviewsTable";

const Reviews = () => {
  const param = useParams();
  const project_id = parseInt(param.project_id);
  const project_title = param.project_title;
  const api = useAxios();
  const [reviews, setReviews] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      console.log(project_id);
      try {
        let response = await api.get(`reviews/${project_id}`);
        let data = await response.data;
        console.log(data);
        if (response.status === 200) {
          setReviews(data.data);
        } else {
          alert("error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [render]);

  return (
    <div className="requirments">
      <h1>Last 10 Reviews of Project {project_title}</h1>
      <Link to={`add-reviews`} className="add-req">
        Add Reviews
      </Link>
      <Link to={`sources`} className="sources-btn">
        Sources
      </Link>
      <div className="requirments-table">
        {reviews.length > 0 ? (
          <ReviewTable
            reviews={reviews}
            setRender={setRender}
            render={render}
          />
        ) : (
          <p>loading data</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
