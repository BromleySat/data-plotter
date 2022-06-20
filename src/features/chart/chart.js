import React, { useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
import { RenderLine } from "./renderLine";

function Chart({ visibleData }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontFamily: "Quicksand",
        fontWeight: "700",
      }}
    >
      <LineChart width={800} height={400} data={visibleData}>
        <CartesianGrid></CartesianGrid>
        <XAxis dataKey="time"></XAxis>
        <YAxis yAxisId="left-axis" allowDataOverflow></YAxis>
        <YAxis yAxisId="right-axis" orientation="right"></YAxis>
        <Tooltip></Tooltip>
        <Legend></Legend>
        {RenderLine(visibleData)}
      </LineChart>
    </div>
  );
}

export default Chart;
