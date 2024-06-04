import React, { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import MyBarCharts from "../../features/dashboard/MyBarCharts";
import useAxios from "../../hooks/useAxios";
import { MDBSpinner } from "mdb-react-ui-kit";
import Loading from "../../ui/Loading";

const barChartColors = [
  "var(--chart-color-1)",
  "var(--chart-color-6)",
  "var(--chart-color-4)",
  "var(--chart-color-5)",
  "var(--chart-color-3)",
];

const AdminDashboard = () => {
  const api = useAxios();
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, usersRes] = await Promise.all([
          api.get("dashboard-categories"),
          api.get("dashboard-users"),
        ]);
        const categoriesData = categoriesRes.data;
        const usersData = usersRes.data;
        console.log(categoriesData, usersData);
        if (categoriesRes.status === 200 && usersRes.status === 200) {
          setCategories(categoriesData);
          setUsers(usersData);
        } else {
          throw new Error("An error occurred while fetching data.");
        }
      } catch (error) {
        console.log(error);
        alert("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (categories.length === 0 || users.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <>
      <div type="horizontal">
        <h1>Dashboard</h1>
        <div className="charts">
          <div className="bar-chart  chart">
            <MyBarCharts
              data={categories}
              x={"category_name"}
              y={"projects_number"}
              color={barChartColors[0]}
              labelText1={"Projects Count"}
              text={"Projects Count For each Categories"}
            />
          </div>
          <div className="bar-chart chart">
            <MyBarCharts
              data={users}
              x={"date"}
              y={"accounts_count"}
              text={"Accounts Count According Date"}
              labelText1={"Accounts Count"}
              color={barChartColors[4]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
