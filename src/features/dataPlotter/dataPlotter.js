import React, { useState, useCallback } from "react";
import Chart from "../chart/chart";
import { RefreshRate } from "../refreshRate/refreshRate";
import axios from "axios";

import { BromleySatSwitch } from "../../components/switch";

export const DataPlotter = ({}) => {
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
    console.log("bllskalkdlaskf");
    if (term === "") {
      return;
    }
    // event.preventDefault();
    setTerm(textboxValue);
    // setData([]);
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
      <RefreshRate term={term} getData={getData} />
      <BromleySatSwitch checked={toggle} onChange={onCheckboxChange} />
      {/* <form action="" onSubmit={onFormSubmit}>
          <input
            onChange={(e) => setTextboxValue(e.target.value)}
            type="text"
            name="Dyna"
            defaultValue={term}
          />
          <input type="submit" value="Update"></input>
        </form> */}

      <h1 style={{ color: "green" }}>BromleySat's Serial Plotter</h1>
      <Chart data={data} />
    </div>
  );
};
