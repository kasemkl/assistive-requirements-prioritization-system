import React, { useEffect, useState } from "react";
import UsersTable from "../../features/users/UsersTable";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import "../styles/users.css";
const Users = () => {
  const [users, setUsers] = useState([]);
  const api = useAxios();
  const [render, setRender] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.get("product-owner-accounts");
      const data = await response.data;
      console.log(response.data);
      if (response.status === 200) {
        setUsers(data.data);
      } else {
        alert("an error occurs.");
      }
    };
    fetchUsers();
  }, [render]);

  return (
    <div className="users">
      <h1>Users: {users.length}</h1>
      <Link to={`add-user`} className="add-user">
        Add User
      </Link>
      {users ? (
        <UsersTable users={users} render={render} setRender={setRender} />
      ) : (
        <p>Loading Users....</p>
      )}
    </div>
  );
};

export default Users;
