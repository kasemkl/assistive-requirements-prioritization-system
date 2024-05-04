import React from "react";
import { useParams } from "react-router-dom";

const CategoryProjects = () => {
  const param = useParams();
  const category_id = param.category_id;

  return <div>{category_id}</div>;
};

export default CategoryProjects;
