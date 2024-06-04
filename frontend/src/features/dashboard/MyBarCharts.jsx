import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "Req-10",
//     Reviews: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Req-5",
//     Reviews: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Req-3",
//     Reviews: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Req-13",
//     Reviews: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Req-7",
//     Reviews: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
// ];

const MyBarCharts = ({
  data,
  x,
  y,
  color,
  height,
  width,
  color2,
  y2,
  stack,
  text,
  labelText1,
  labelText2,
}) => {
  // console.log(data);
  return (
    // <div className="chart">
    <ResponsiveContainer width="100%" height="80%">
      <div className="chart-title">
        <p>{text}</p>
      </div>
      <div className="chart-label">
        <div className={`chart-label-inner`}>
          <p className={`square`} style={{ backgroundColor: color }}></p>
          <p>{labelText1}</p>
        </div>
        {y2 && (
          <div className={`chart-label-inner`}>
            <p className={`square`} style={{ backgroundColor: color2 }}></p>
            <p>{labelText2}</p>
          </div>
        )}
      </div>

      <BarChart
        // width={width}
        // height={height}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={30}
      >
        <XAxis
          dataKey={`${x}`}
          // scale="point"
          padding={{ left: 10, right: 10 }}
        />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <Bar
          type="monotone"
          dataKey={`${y}`}
          fill={`${color}`}
          // background={{ fill: "#eee" }}
          stackId={stack ? "1" : "0"}
        />
        {y2 && (
          <Bar
            dataKey={`${y2}`}
            fill={`${color2}`}
            // background={{ fill: "#eee" }}
            stackId={"1"}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarCharts;
