import React from "react";
import {
  LineChart,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
import { RenderLine } from "../../helpers/chart/renderLine";
import moment from "moment";
import "./Chart.css";
import {
  useRefAreaLeft,
  useRefAreaRight,
  useSetRefAreaLeft,
  useSetRefAreaRight,
  useLeft,
  useRight,
  useSetLeft,
  useSetRight,
  useData,
} from "../../context/chartContext/chartControlContext";

const Chart = ({ validUrl }) => {
  const left = useLeft();
  const right = useRight();
  const setLeft = useSetLeft();
  const setRight = useSetRight();
  let refAreaLeft = useRefAreaLeft();
  let refAreaRight = useRefAreaRight();
  const setRefAreaLeft = useSetRefAreaLeft();
  const setRefAreaRight = useSetRefAreaRight();
  const data = useData();

  const zoom = () => {
    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setRefAreaLeft("");
      setRefAreaRight("");
      return;
    }

    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    setRefAreaLeft("");
    setRefAreaRight("");
    setLeft(refAreaLeft);
    setRight(refAreaRight);
  };

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data-testid={`line-chart-${validUrl}`}
          data={data}
          onMouseDown={(e) => {
            if (e !== null) {
              setRefAreaLeft(e.activeLabel);
            }
          }}
          onMouseMove={(e) => refAreaLeft && setRefAreaRight(e.activeLabel)}
          onMouseUp={zoom}
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickFormatter={(unixTime) => moment(unixTime).format("HH:mm:ss")}
            allowDataOverflow={true}
            domain={[left, right]}
            type="number"
          />
          <YAxis
            allowDataOverflow
            type="number"
            yAxisId="left-axis"
            domain={["dataMin - 5", "dataMax + 5"]}
          />
          <YAxis
            orientation="right"
            allowDataOverflow
            type="number"
            yAxisId="right-axis"
            domain={["dataMin", 5]}
          />
          <Tooltip
            labelFormatter={function (value) {
              value = moment(value).format("HH:mm:ss");
              return `TIME: ${value}`;
            }}
            labelStyle={{ color: "#000" }}
          />
          <Legend></Legend>
          {RenderLine(data)}
          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
              yAxisId="left-axis"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
