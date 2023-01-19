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
  let values = Object.entries(data[data.length - 1])
    .map(([key, value]) => {
      if (
        key === "deviceId" ||
        key === "time" ||
        key === "date" ||
        key === "currentTime" ||
        key === "number"
      ) {
        return false;
      }
      return value;
    })
    .filter((value) => value !== false);

  if (columns.length > 5) {
    columns = columns.slice(0, 5);
  }
  let i = 0;
  return columns.map((column, index) => {
    const indexValue = values[index];
    if (indexValue < 5 && column === "TemperatureF") {
      return (
        <Line
          yAxisId="right-axis"
          key={column}
          data-testid={"chart-line-" + column}
          type="monotone"
          dataKey={column}
          stroke={colors[i++]}
          isAnimationActive={false}
          dot={false}
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
        isAnimationActive={false}
        dot={false}
      />
    );
  });
};
