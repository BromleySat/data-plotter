import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { RenderLine } from "./renderLine";

function chart({ data }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontFamily: "Quicksand",
        fontWeight: "700",
      }}
    >
      <LineChart width={1000} height={300} data={data}>
        <CartesianGrid></CartesianGrid>
        <XAxis dataKey="time"></XAxis>
        <YAxis yAxisId="left-axis"></YAxis>
        <YAxis yAxisId="right-axis" orientation="right"></YAxis>
        <Tooltip></Tooltip>
        <Legend></Legend>
        {RenderLine(data)}
      </LineChart>
    </div>
  );
}

export default chart;
