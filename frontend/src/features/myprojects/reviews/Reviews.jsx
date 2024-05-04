import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReqTable from "../requirments/ReqTable";
import "../../../styles/requiremnts.css";
import useAxios from "../../../hooks/useAxios";
import ReviewTable from "./ReviewsTable";

const Reviews = () => {
  const param = useParams();
  const project_id = parseInt(param.project_id);
  console.log(project_id);
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
      <h1>Last 10 Reviews of Project {param.id}</h1>
      <Link to={`add-reviews`} className="add-req">
        Add Reviews
      </Link>
      <div className="requirments-table">
        <ReviewTable reviews={reviews} setRender={setRender} render={render} />
      </div>
    </div>
  );
};

export default Reviews;
