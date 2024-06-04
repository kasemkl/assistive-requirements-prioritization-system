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

export default function MyAreaChart({
  data,
  name,
  value1,
  value2,
  colors,
  height,
  width,
  labelText1,
  labelText2,
}) {
  console.log(value2);
  return (
    <ResponsiveContainer width="100%" height="80%">
      <div className="chart-title">
        <p>Number Of Positive And Negative Reviews Accoding Date</p>
      </div>
      <div className="chart-label">
        <div className={`chart-label-inner`}>
          <p className={`square`} style={{ backgroundColor: colors[0] }}></p>
          <p>{labelText1}</p>
        </div>

        <div className={`chart-label-inner`}>
          <p className={`square`} style={{ backgroundColor: colors[1] }}></p>
          <p>{labelText2}</p>
        </div>
      </div>
      <AreaChart
        // width={width}
        // height={height}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={`${colors[0]}`} stopOpacity={0.8} />
            <stop offset="95%" stopColor={`${colors[0]}`} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={`${colors[1]}`} stopOpacity={0.8} />
            <stop offset="95%" stopColor={`${colors[1]}`} stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* <CartesianGrid strokeDasharray="10 10" /> */}
        <XAxis dataKey={`${name}`} />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Area
          type="monotone"
          dataKey={`${value1}`}
          stackId="1"
          stroke={`${colors[0]}`}
          fill="url(#colorUv)"
          strokeWidth={4}
        />
        <Area
          type="monotone"
          dataKey={`${value2}`}
          stackId="1"
          stroke={`${colors[1]}`}
          fill="url(#colorPv)"
          strokeWidth={4}
          opacity={0.5}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
