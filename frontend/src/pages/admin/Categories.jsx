import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import CategoryCard from "../../features/categories/CategoryCard";
import "../../styles/categories.css";
import { Link } from "react-router-dom";
const Categories = () => {
  const api = useAxios();
  const [categories, setCategories] = useState([]);
  const [Render, setRender] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("categories");
        const data = await response.data;
        console.log(data);
        if (response.status === 200) {
          setCategories(data);
        } else {
          alert("error occurs");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [Render]);
  console.log(categories);
  return (
    <div className="container">
      <h1>Categories</h1>
      <div className="categories">
        <Link to="add-category" className="add-category">
          Add Category
        </Link>
        {categories.map((category) => {
          return (
            <CategoryCard
              key={category.id}
              category={category}
              Render={Render}
              setRender={setRender}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
