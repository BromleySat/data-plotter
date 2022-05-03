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
  state = { data: [] };

  componentDidMount() {
    const dataInterval = setInterval(this.getData, 5000);
  }

  componentDidUpdate() {
    console.log(this.state.data);
  }
  // FIX THE DATA - MAKE IT DYNAMIC
  getData = async () => {
    const response = await axios.get("/random-data");
    this.setState({
      data: [
        ...this.state.data,
        {
          name1: response.data.DY5I2K,
          name2: response.data.WGDK5H,
          deviceId: response.data.deviceId,
        },
      ],
    });
  };

  render() {
    return (
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="BromleySat" />
        <h1 style={{ color: "green" }}>BromleySat's Serial Plotter</h1>
        <LineChart width={1000} height={300} data={this.state.data}>
          <CartesianGrid></CartesianGrid>
          <XAxis dataKey="deviceId"></XAxis>
          <YAxis></YAxis>
          <Tooltip></Tooltip>
          <Legend></Legend>
          <Line type="monotone" dataKey="name2" stroke="red"></Line>
          <Line
            type="monotone"
            dataKey="name1" //{this.state.data.name2}
            stroke="blue"
          ></Line>
        </LineChart>
      </div>
    );
  }
}

// useEffect(() => {
//   getData();
// }, []);

export default App;
