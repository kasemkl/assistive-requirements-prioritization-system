import React, { useContext, useEffect, useState } from "react";
import "../../styles/add_project.css";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../contexts/AuthContext";
import Modal from "../../ui/Modal";
import { MDBSpinner } from "mdb-react-ui-kit";
import Loading from "../../ui/Loading";

const AddProject = () => {
  const api = useAxios();
  const { baseURL } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState({ title: "", body: "" });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        const data = await response.data;
        console.log(data);
        if (response.status === 200) {
          setCategories(data);
        } else {
          alert("An error occurred while fetching categories.");
        }
      } catch (error) {
        console.log(error);
        alert("An error occurred while fetching categories.");
      } finally {
        setLoading(false);
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
    if (!formData.title || !formData.description || !formData.category_id) {
      setModalText({ title: "Failed", body: "All fields are required." });
      setShowModal(true);
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(formData.title)) {
      setModalText({
        title: "Project Title Error",
        body: "Project title must contain only letters .",
      });
      setShowModal(true);
      return;
    }

    try {
      let response = await api.post("/projects", formData);
      let data = await response.data;
      console.log(data);
      if (response.status === 201) {
        setModalText({
          title: "Project Creating",
          body: data.message,
        });
        setShowModal(true);
        setFormData({
          title: "",
          description: "",
          category_id: null,
        });
      } else {
        setModalText({
          title: "Project Creating",
          body: "New Project Adding Failed",
        });
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      {showModal && (
        <Modal text={modalText} onHide={() => setShowModal(false)} />
      )}
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
