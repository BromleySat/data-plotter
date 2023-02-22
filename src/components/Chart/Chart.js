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
import { RenderLine } from "../../helpers/chart/renderLine";
import moment from "moment";
import "./Chart.css";
import { connect } from "react-redux";
import {
  setLeft,
  setRight,
  setRefAreaLeft,
  setRefAreaRight,
  animation,
} from "../../redux/chart/chartSlice";

class Chart extends PureComponent {
  zoom() {
    let { refAreaLeft, refAreaRight } = this.props;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      this.props.setRefAreaLeft("");
      this.props.setRefAreaRight("");
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
    // this.props.visibleData.slice();
    this.props.setRefAreaLeft("");
    this.props.setRefAreaRight("");
    this.props.setLeft(refAreaLeft);
    this.props.setRight(refAreaRight);
  }

  render() {
    console.log(this.props.data);
    const { left, right, refAreaLeft, refAreaRight } = this.props;
    const validUrl = this.props.validUrl;

    return (
      <div className="chart">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data-testid={`line-chart-${validUrl}`}
            data={this.props.data}
            onMouseDown={(e) => {
              if (e !== null) {
                this.props.setRefAreaLeft(e.activeLabel);
              }
            }}
            onMouseMove={(e) =>
              refAreaLeft && this.props.setRefAreaRight(e.activeLabel)
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
            {RenderLine(this.props.data)}
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

const mapStateToProps = (state) => ({
  left: state.chart.left,
  right: state.chart.right,
  refAreaLeft: state.chart.refAreaLeft,
  refAreaRight: state.chart.refAreaRight,
  animation: state.chart.animation,
  data: state.data.data,
});

const mapDispatchToProps = {
  setLeft,
  setRight,
  setRefAreaLeft,
  setRefAreaRight,
  animation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
