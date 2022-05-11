import "./App.css";
import React, { Component } from "react";
import logo from "./Logo.jpg";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

class App extends Component {
  state = {
    data: [],
    term: "http://localhost:5229/random-data",
    textboxValue: "",
  };

  componentDidMount() {
    const dataInterval = setInterval(this.getData, 5000);
  }

  componentDidUpdate() {
    console.log(this.state.data);
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.setState({ term: this.state.textboxValue, data: [] });
    console.log(this.state);
  };

  getData = async () => {
    await axios.get(this.state.term).then((res) => {
      var today = new Date();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      res.data.time = time;
      this.setState({
        data: [...this.state.data, res.data],
      });
    });
  };

  renderLine = () => {
    const colors = ["red", "blue", "green", "yellow", "orange"];
    const columns = Object.entries(this.state.data[this.state.data.length - 1])
      .map(([key, value]) => key)
      .filter(
        (column) =>
          column !== "deviceId" && column !== "time" && column !== "date"
      );
    let i = 0;
    return columns.map((column) => {
      return (
        <Line
          data-testid="1"
          type="monotone"
          dataKey={column}
          stroke={colors[i++]}
        />
      );
    });
  };

  render() {
    if (!this.state.data || this.state.data.length === 0) {
      return <div>Loading..</div>;
    }
    return (
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={this.onFormSubmit}>
          <label style={{ marginTop: "30px" }}>
            <input
              onChange={(e) => this.setState({ textboxValue: e.target.value })}
              type="text"
              name="Dynamic Configurable API URL"
              defaultValue={this.state.term}
            />
            <input type="submit" value="Update" />
          </label>
        </form>

        <img src={logo} alt="BromleySat" />
        <h1 data-testid="custom-element" style={{ color: "green" }}>
          BromleySat's Serial Plotter
        </h1>
        <LineChart width={1000} height={300} data={this.state.data}>
          <CartesianGrid></CartesianGrid>
          <XAxis dataKey="time"></XAxis>
          <YAxis></YAxis>
          <Tooltip></Tooltip>
          <Legend></Legend>
          {this.renderLine()}
        </LineChart>
      </div>
    );
  }
}

export default App;
