import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { pieArcLabelClasses } from "@mui/x-charts/PieChart";

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  legend: { hidden: true },
};

// // Define the data variable with an array of data points
// // const data = [
// //   { id: 0, value: 10, label: "series A" },
// //   { id: 1, value: 15, label: "series B" },
// //   { id: 2, value: 20, label: "series C" },
// ];

// Calculate the total value of the data points

// Function to generate arc labels based on the percentage of total

export default function BasicPie(data) {
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };
  return (
    <PieChart
      series={[
        {
          data: data,
          innerRadius: 20,
          outerRadius: 100,
          paddingAngle: -5,
          cornerRadius: 5,
          startAngle: -185,
          endAngle: 176,
          cx: 152,
          cy: 150,
          outerRadius: 80,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}
