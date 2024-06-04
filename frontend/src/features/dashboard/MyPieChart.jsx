import React, { useCallback, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import "../../styles/variables.css";

// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
// ];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
  value,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {` ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function MyPieChart({ data, value, COLORS, height, width }) {
  return (
    <div className="">
      <div className="chart-title">
        <p>Reviews By Polarity</p>
      </div>
      <ResponsiveContainer width={width} height={height}>
        <PieChart>
          <Tooltip />
          <Pie
            data={data}
            cx={150}
            cy={90}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        {data.map((sent, index) => (
          <div
            className={`${sent.name.toLowerCase()} sentiment`}
            key={sent.name}
          >
            <p
              className={`square-${sent.name.toLowerCase()}`}
              style={{ backgroundColor: COLORS[index] }}
            ></p>
            <p>{sent.name}</p>
          </div>
        ))}
      </ResponsiveContainer>
    </div>
  );
}
