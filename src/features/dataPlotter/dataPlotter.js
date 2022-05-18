import React, { useState, useEffect } from "react";
import Chart from "../chart/chart";

import axios from "axios";
import { useSelector } from "react-redux";
import { toggleDataStorage } from "../dataStorage/dataStorageSlice";

export const DataPlotter = ({}) => {
  const localStorageToggled = useSelector(toggleDataStorage);

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
      //   if (dataStorage) {
      //     localStorage.setItem("localStorageData", JSON.stringify(data));
      //   } else {
      //     localStorage.removeItem("localStorageData");
      //   }
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
    // localStorage.setItem("checked", e.target.checked);
    setToggle(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem("localStorageData", JSON.stringify(data));
    } else {
      localStorage.removeItem("localStorageData");
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

      <input type="checkbox" checked={localStorageToggled} />
      <h1 style={{ color: "green" }}>BromleySat's Serial Plotter</h1>
      <Chart>data={data}</Chart>
    </div>
  );
};
