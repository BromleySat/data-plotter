import "./App.css";
import React, { useState, useEffect } from "react";
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
import { useTheme } from "@material-ui/core/styles";
import { withTheme } from "./themes/Theme";
import { DarkThemeToggle } from "./features/darkTheme/darkThemeToggle";
import Grid from "@mui/material/Grid";

function App() {
  const theme = useTheme();
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("localStorageData") || "[]")
  );
  const [term, setTerm] = useState(
    localStorage.getItem("api-address") || "http://localhost:5229/random-data"
  );
  const [textboxValue, setTextboxValue] = useState("");
  const [toggle, setToggle] = useState(
    JSON.parse(localStorage.getItem("checked") || false)
  );

  let dataInterval;

  useEffect(() => {
    if (term === "") {
      return;
    }
    // const interval = localStorage.getItem("...");
    // dataInterval = setInterval(getData, interval ?? 5000);
  }, [term]);

  const onFormSubmit = (event) => {
    console.log("bllskalkdlaskf");
    if (term === "") {
      return;
    }
    // event.preventDefault();
    setTerm(textboxValue);
    // setData([]);
    localStorage.setItem("api-address", textboxValue);
  };

  const getData = async () => {
    await axios.get(term).then((res) => {
      var today = new Date();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      res.data.time = time;
      setData((data) => [...data, res.data]);
      localStorage.setItem("localStorageData", JSON.stringify(data));
    });
  };

  const onChangeInterval = (e) => {
    if (term === "") {
      return;
    }
    clearInterval(dataInterval);
    dataInterval = setInterval(getData, e.target.value);
  };

  const onCheckboxChange = (e) => {
    localStorage.setItem("checked", e.target.checked);
    setToggle(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem("localStorageData", JSON.stringify(data));
    } else {
      localStorage.removeItem("localStorageData");
    }
  };

  const renderLine = (data) => {
    if (!data || data.length === 0) {
      return <div>Loading...</div>;
    }

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

  return (
    <Grid
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        margin: 0,
        alignItems: "center",
        justifyContent: "center",
        bgcolor: theme.palette.background.default,
        color: "text.primary",
        borderRadius: 0,
        p: 3,
      }}
    >
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input type="checkbox" checked={toggle} onChange={onCheckboxChange} />
        <select
          defaultValue={localStorage.getItem("...")}
          onChange={onChangeInterval}
        >
          <option value="5000">5s</option>
          <option value="10000">10s</option>
          <option value="15000">15s</option>
          <option value="20000">20s</option>
          <option value="25000">25s</option>
        </select>
        {/* <form action="" onSubmit={onFormSubmit}>
          <input
            onChange={(e) => setTextboxValue(e.target.value)}
            type="text"
            name="Dyna"
            defaultValue={term}
          />
          <input type="submit" value="Update"></input>
        </form> */}

        <img src={logo} alt="BromleySat" />
        <h1 style={{ color: "green" }}>BromleySat's Serial Plotter</h1>
        <LineChart width={1000} height={300} data={data}>
          <CartesianGrid></CartesianGrid>
          <XAxis dataKey="time"></XAxis>
          <YAxis></YAxis>
          <Tooltip></Tooltip>
          <Legend></Legend>
          {renderLine(data)}
        </LineChart>
      </div>
      <DarkThemeToggle />
    </Grid>
  );
}

export default withTheme(App);
