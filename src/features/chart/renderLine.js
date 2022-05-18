import React from "react";
import { Line } from "recharts";

export const renderLine = (data) => {
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  const colors = ["red", "blue", "green", "yellow", "orange"];
  const columns = Object.entries(data[data.length - 1])
    .map(([key, value]) => key)
    .filter(
      (column) =>
        column !== "deviceId" && column !== "time" && column !== "date"
    );
  let i = 0;
  return columns.map((column) => {
    return (
      <Line
        key={column}
        data-testid={"chart-line-" + column}
        type="monotone"
        dataKey={column}
        stroke={colors[i++]}
      />
    );
  });
};
