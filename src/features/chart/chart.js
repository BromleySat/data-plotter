import React, { PureComponent } from "react";
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
import { RenderLine } from "./renderLine";
import moment from "moment";
import "./chart.css";

export default class Chart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      left: "dataMin",
      right: "dataMax",
      refAreaLeft: "",
      refAreaRight: "",
      animation: true,
    };
  }

  componentDidUpdate() {
    if (this.props.zoomedOut.value === true) {
      this.props.zoomedOut.value = false;
      this.zoomOut();
    }
  }

  zoom() {
    let { refAreaLeft, refAreaRight } = this.state;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      this.setState(() => ({
        refAreaLeft: "",
        refAreaRight: "",
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
    this.props.visibleData.slice();
    this.setState(() => ({
      refAreaLeft: "",
      refAreaRight: "",
      left: refAreaLeft,
      right: refAreaRight,
    }));
  }

  zoomOut() {
    this.props.visibleData.slice();
    this.setState(() => ({
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
    }));
  }

  render() {
    const { left, right, refAreaLeft, refAreaRight } = this.state;
    const currentUrl = this.props.currentUrl;

    return (
      <div className="chart">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data-testid={`line-chart-${currentUrl}`}
            data={this.props.visibleData}
            onMouseDown={(e) => {
              if (e !== null) {
                this.setState({ refAreaLeft: e.activeLabel });
              }
            }}
            onMouseMove={(e) =>
              this.state.refAreaLeft &&
              this.setState({ refAreaRight: e.activeLabel })
            }
            // eslint-disable-next-line react/jsx-no-bind
            onMouseUp={this.zoom.bind(this)}
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
              domain={["dataMin - 10", "dataMax + 10"]}
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
            {RenderLine(this.props.visibleData)}
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
  }
}
