import React, { useContext, useEffect, useState } from "react";
import "../styles/add_project.css";
import educationLogo from "../data/img/education-logo-template-design-illustration-icon-vector.jpg";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../contexts/AuthContext";

const AddProject = () => {
  const api = useAxios();
  const { baseURL } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: null,
  });
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let response = await api.get("/categories");
        console.log(response.data);
        let data = await response.data; // Await the JSON parsing
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddProject = async () => {
    try {
      let response = await api.post("/projects", formData);
      let data = await response.data;
      console.log(data);
      if (response.status === 201) {
        alert(data.message);
        setFormData({
          title: "",
          description: "",
          category_id: null,
        });
      } else {
        alert("error occurs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(categories);
  return (
    <div className="container">
      <h1>Add Project</h1>
      <div className="add-proj-req-form">
        <div className="add-project">
          <div className="field title">
            <label>Title</label>
            <input
              type="text"
              className=""
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="field description">
            <label>Description</label>
            <input
              type="text"
              className=""
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="field category">
            <label>Category</label>
            <div className="category-list">
              {categories.map((category) => (
                <div className="category-item" key={category.id}>
                  <img
                    src={`${baseURL}${category.photo}`}
                    alt={category}
                    style={{ width: "90px" }}
                  />
                  <label>
                    <input
                      type="radio"
                      value={category.id}
                      name="category_id"
                      checked={parseInt(formData.category_id) === category.id}
                      onChange={handleChange}
                    />

                    {category.category_name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="buttons">
            <button className="btn btn-primary" onClick={handleAddProject}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
