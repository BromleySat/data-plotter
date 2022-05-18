import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { renderLine } from "./renderLine";

function chart({ data }) {
  return (
    <LineChart width={1000} height={300} data={data}>
      <CartesianGrid></CartesianGrid>
      <XAxis dataKey="time"></XAxis>
      <YAxis></YAxis>
      <Tooltip></Tooltip>
      <Legend></Legend>
      {renderLine}
    </LineChart>
  );
}

export default chart;
