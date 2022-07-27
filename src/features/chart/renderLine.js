import React from "react";
import { Line } from "recharts";

export const RenderLine = (data) => {
  if (!data || data.length === 0) {
    return "";
  }

  const colors = ["#ff0505", "#0285f7", "#00C119", "#ae02f7", "#d41393"];
  let columns = Object.entries(data[data.length - 1])
    .map(([key, value]) => key)
    .filter(
      (column) =>
        column !== "deviceId" &&
        column !== "time" &&
        column !== "date" &&
        column !== "currentTime" &&
        column !== "number"
    );
  let valArray = [];
  let numArray = [];
  Object.entries(data[data.length - 1]).forEach(([key, value]) =>
    valArray.push(value)
  );

  for (let value of valArray) {
    if (Number.isInteger(value)) {
      numArray.push(value);
    }
  }
  if (columns.length > 5) {
    columns = columns.slice(0, 5);
  }
  let i = 0;
  return columns.map((column, index) => {
    const indexValue = numArray[index];
    if (indexValue < 5) {
      return (
        <Line
          yAxisId="right-axis"
          key={column}
          data-testid={"chart-line-" + column}
          type="monotone"
          dataKey={column}
          stroke={colors[i++]}
        />
      );
    }
    return (
      <Line
        yAxisId="left-axis"
        key={column}
        data-testid={"chart-line-" + column}
        type="monotone"
        dataKey={column}
        stroke={colors[i++]}
      />
    );
  });
};
