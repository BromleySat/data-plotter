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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons";

export const zoomOutContext = React.createContext();

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
    this.props.zoomOut(this.zoomOut);

    return (
      <div className="chart">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            width={800}
            height={400}
            data={this.props.visibleData}
            onMouseDown={(e) => this.setState({ refAreaLeft: e.activeLabel })}
            onMouseMove={(e) =>
              this.state.refAreaLeft &&
              this.setState({ refAreaRight: e.activeLabel })
            }
            // eslint-disable-next-line react/jsx-no-bind
            onMouseUp={this.zoom.bind(this)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(unixTime) => moment(unixTime).format("h:mm:ss")}
              allowDataOverflow={true}
              domain={[left, right]}
              type="number"
            />
            <YAxis allowDataOverflow type="number" yAxisId="left-axis" />
            <YAxis
              orientation="right"
              allowDataOverflow
              type="number"
              yAxisId="right-axis"
            />
            <Tooltip
              labelFormatter={function (value) {
                value = moment(value).format("h:mm:ss");
                return `TIME: ${value}`;
              }}
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
