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
import { connect } from "react-redux";
import {
  zoom,
  zoomOut,
  updateRefAreaLeft,
  updateRefAreaRight,
  updateData,
  sliceData,
  updateLeft,
  updateRight,
} from "./chartSlice";
import { RenderLine } from "./renderLine";
import moment from "moment";
import "./chart.css";

export class Chart extends PureComponent {
  render() {
    this.props.updateData(this.props.visibleData);
    return (
      <div className="chart">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            width={800}
            height={400}
            data={this.props.data}
            onMouseDown={(e) => {
              this.props.updateRefAreaLeft(e.activeLabel);
            }}
            onMouseMove={(e) => {
              this.props.refAreaLeft &&
                this.props.updateRefAreaRight(e.activeLabel);
            }}
            // eslint-disable-next-line react/jsx-no-bind
            onMouseUp={() => this.props.zoom()}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(unixTime) => moment(unixTime).format("h:mm:ss")}
              allowDataOverflow={true}
              domain={[this.props.left, this.props.right]}
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

            {RenderLine(this.props.data)}
            {this.props.refAreaLeft && this.props.refAreaRight ? (
              <ReferenceArea
                yAxisId="left-axis"
                x1={this.props.refAreaLeft}
                x2={this.props.refAreaRight}
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
  data: state.chart.data,
});

export default connect(mapStateToProps, {
  zoom,
  zoomOut,
  updateRefAreaLeft,
  updateRefAreaRight,
  updateData,
  sliceData,
  updateLeft,
  updateRight,
})(Chart);
