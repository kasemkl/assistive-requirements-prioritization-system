import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//   },
// ];

export default function MyLineChart({
  data,
  name,
  value1,
  value2,
  colors,
  height,
  width,
}) {
  console.log(value2);
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={`${name}`} padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={`${value1}`}
          stackId="1"
          stroke={`${colors[0]}`}
          activeDot={{ r: 8 }}
          strokeOpacity={1}
          strokeWidth={4}
          //   strokeDasharray="5 5"
        />
        <Line
          type="monotone"
          dataKey={`${value2}`}
          stackId="1"
          stroke={`${colors[1]}`}
          strokeWidth={4}
          //   strokeDasharray="1 2"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
