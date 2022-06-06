import React, { useCallback, useState } from "react";
import DataRetention from "../dataRetention/dataRetention";
import Chart from "../chart/chart";
import { RefreshRate } from "../refreshRate/refreshRate";
import { BromleySatSwitch } from "../../components/switch";
import { lastIndexOf } from "../helpers/lastIndexOf";
import { Typography } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import axios from "axios";

const ChartControl = ({ validUrl, deviceId }) => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("localStorageData") || "[]")
  );
  const [toggle, setToggle] = useState(
    JSON.parse(localStorage.getItem("checked") || false)
  );
  const theme = useTheme();

  const getData = useCallback(async () => {
    if (validUrl) {
      await axios.get(validUrl).then(
        (res) => {
          var today = new Date();
          var time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();
          res.data.time = time;
          res.data.currentTime = today;
          setData((data) => [...data, res.data]);
          console.log(data);

          if (toggle) {
            localStorage.setItem("localStorageData", JSON.stringify(data));
          } else {
            localStorage.removeItem("localStorageData");
          }
        },
        (error) => {
          console.log(error);

          //   setValidUrl("");
        }
      );
    }
  }, [data, validUrl, toggle]);

  const removeData = () => {
    if (data.length < 1) {
      return;
    }
    const value = localStorage.getItem("dataRetention") || 5000;
    console.log("Remove data " + value);
    const now = new Date();
    const cutOff = now.getTime() - value;
    console.log("Now " + now);
    console.log("Cut Off " + new Date(cutOff));
    const oldElementIndex = lastIndexOf(data, cutOff);
    console.log(
      "Data index 0 " +
        data[0].currentTime.getTime() +
        " " +
        cutOff +
        " " +
        (data[0].currentTime.getTime() - cutOff)
    );
    console.log(oldElementIndex);
    if (oldElementIndex !== -1) {
      setData(data.slice(oldElementIndex));
    }
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
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <DataRetention removeData={removeData} />
        <Typography
          variant="h4"
          style={{
            color: "#00C119",
            fontFamily: "Quicksand",
            fontWeight: "700",
          }}
        >
          {deviceId}
        </Typography>
        <RefreshRate validUrl={validUrl} getData={getData} />
      </div>
      <Chart data={data} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: "20px",
        }}
      >
        <div style={{ minHeight: "100px" }}>
          <Typography
            sx={{
              color: theme.palette.text.primary,
              fontFamily: "Quicksand",
              fontWeight: "700",
            }}
          >
            Local Storage Toggle
          </Typography>
          <BromleySatSwitch checked={toggle} onChange={onCheckboxChange} />
        </div>
      </div>
    </>
  );
};

export default ChartControl;
