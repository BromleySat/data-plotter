import React, { useState, useCallback } from "react";
import Chart from "../chart/chart";
import { RefreshRate } from "../refreshRate/refreshRate";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BromleySatSwitch } from "../../components/switch";
import { useTheme } from "@material-ui/core/styles";
import { Typography } from "@mui/material";

export const DataPlotter = ({}) => {
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

  const getData = useCallback(async () => {
    await axios.get(term).then((res) => {
      var today = new Date();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      res.data.time = time;
      setData((data) => [...data, res.data]);
      console.log(data);
      if (toggle) {
        localStorage.setItem("localStorageData", JSON.stringify(data));
      } else {
        localStorage.removeItem("localStorageData");
      }
    });
  }, [data, term, toggle]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (term === "") {
      return;
    }
    setTerm(textboxValue);
    setData([]);
    localStorage.setItem("api-address", textboxValue);
  };

  const onCheckboxChange = (e) => {
    localStorage.setItem("checked", e.target.checked);
    setToggle(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem("localStorageData", JSON.stringify(data));
    } else {
      // Hidden Bug, removes data
      localStorage.removeItem("localStorageData");
      console.log("anything");
    }
  };
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form
        autoComplete="off"
        onSubmit={onFormSubmit}
        style={{ marginTop: "20px" }}
      >
        <TextField
          id="standard-basic"
          variant="standard"
          onChange={(e) => setTextboxValue(e.target.value)}
          defaultValue={term}
          sx={{ input: { color: theme.palette.text.primary } }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{ marginLeft: "20px" }}
        >
          Update
        </Button>
      </form>
      <h1 style={{ color: "green" }}>Data Plotter</h1>
      <Chart data={data} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "20px",
          minWidth: "500px",
        }}
      >
        <div>
          <Typography sx={{ color: theme.palette.text.primary }}>
            Refresh Rate
          </Typography>
          <RefreshRate term={term} getData={getData} />
        </div>
        <div style={{ minHeight: "100px", marginLeft: "10px" }}>
          <Typography sx={{ color: theme.palette.text.primary }}>
            Local Storage Toggle
          </Typography>
          <BromleySatSwitch checked={toggle} onChange={onCheckboxChange} />
        </div>
      </div>
    </div>
  );
};
