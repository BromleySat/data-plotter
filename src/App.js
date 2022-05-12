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

export const renderLine = (data) => {
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

let dataInterval;

class App extends Component {
  state = {
    data: JSON.parse(localStorage.getItem("localStorageData") || "[]"),
    term: "http://localhost:5229/random-data",
    textboxValue: "",
    toggle: JSON.parse(localStorage.getItem("checked") || false),
  };

  componentDidMount() {
    const interval = localStorage.getItem("...");
    dataInterval = setInterval(this.getData, interval ?? 5000);
  }

  componentDidUpdate() {
    console.log(localStorage.getItem("localStorageData"));
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.setState({ term: this.state.textboxValue, data: [] });
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
      localStorage.setItem("localStorageData", JSON.stringify(this.state.data));
    });
  };

  onChangeInterval = (e) => {
    clearInterval(dataInterval);
    dataInterval = setInterval(this.getData, e.target.value);
    localStorage.setItem("...", e.target.value);
  };

  onCheckboxChange = (e) => {
    localStorage.setItem("checked", e.target.checked);
    this.setState({ toggle: e.target.checked });
    if (e.target.checked) {
      localStorage.setItem("localStorageData", JSON.stringify(this.state.data));
    } else {
      localStorage.removeItem("localStorageData");
    }
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
        <input
          type="checkbox"
          checked={this.state.toggle}
          onChange={this.onCheckboxChange}
        />
        <select
          defaultValue={localStorage.getItem("...")}
          onChange={this.onChangeInterval}
        >
          <option value="5000">5s</option>
          <option value="10000">10s</option>
          <option value="15000">15s</option>
          <option value="20000">20s</option>
          <option value="25000">25s</option>
        </select>
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
        <h1 style={{ color: "green" }}>BromleySat's Serial Plotter</h1>
        <LineChart width={1000} height={300} data={this.state.data}>
          <CartesianGrid></CartesianGrid>
          <XAxis dataKey="time"></XAxis>
          <YAxis></YAxis>
          <Tooltip></Tooltip>
          <Legend></Legend>
          {renderLine(this.state.data)}
        </LineChart>
      </div>
    );
  }
}

export default App;
