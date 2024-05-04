import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "../styles/dashboard.css";
import Test from "../Test";
import MyAreaChart from "../../features/dashboard/MyAreaChart";
import MyBarCharts from "../../features/dashboard/MyBarCharts";
import MyPieChart from "../../features/dashboard/MyPieChart";
import BasicPie from "../../features/dashboard/BasicPie";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { date: "2024-01-01", users: 1000 },
  { date: "2024-01-02", users: 1050 },
  { date: "2024-01-03", users: 1100 },
  { date: "2024-01-04", users: 1150 },
  { date: "2024-01-05", users: 1200 },
  { date: "2024-01-06", users: 1250 },
  { date: "2024-01-07", users: 1300 },
  { date: "2024-01-08", users: 1350 },
  { date: "2024-01-09", users: 1400 },
  { date: "2024-01-10", users: 1450 },
  { date: "2024-01-11", users: 1500 },
  { date: "2024-01-12", users: 1550 },
  { date: "2024-01-13", users: 1600 },
  { date: "2024-01-14", users: 1650 },
  { date: "2024-01-15", users: 1700 },
];

function Dashboard() {
  return (
    <>
      <div type="horizontal">
        <h1>Dashboard</h1>
        <div className="charts">
          <MyAreaChart />
          <MyBarCharts />
          <MyPieChart />
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
