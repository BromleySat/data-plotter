import React, { useCallback, useState, useRef } from "react";
import DataRetention from "../dataRetention/dataRetention";
import Chart from "../chart/chart";
import { RefreshRate } from "../refreshRate/refreshRate";
import { ChartTimeWindow } from "../chartTimeWindow/chartTimeWindow";
import { BromleySatSwitch } from "../../components/switch";
import { lastIndexOf } from "../helpers/lastIndexOf";
import { Typography } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import axios from "axios";
import moment from "moment";
import Chart2 from "../chart/chart2";

const ChartControl = ({ validUrl, deviceId }) => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem(`DATA FOR ${validUrl}`) || "[]")
  );
  const [visibleData, setVisibleData] = useState([]);
  // JSON.parse(localStorage.getItem(`VISIBLE DATA FOR ${validUrl}`) || "[]")
  const [toggle, setToggle] = useState(
    JSON.parse(localStorage.getItem(`TOGGLE FOR ${validUrl}`) || false)
  );
  const theme = useTheme();

  const counter = useRef(0);

  const getData = useCallback(async () => {
    if (validUrl) {
      await axios.get(validUrl).then(
        (res) => {
          const now = new Date().getTime();
          const filteredData =
            now - localStorage.getItem(`VISIBLE DATA VALUE FOR ${validUrl}`);
          res.data.number = counter.current;
          res.data.time = new Date().getTime();
          // res.data.time = moment().format("h:mm:ss");
          res.data.currentTime = new Date().getTime();
          setData((data) => [...data, res.data]);

          const filData = data.filter(
            (data) => data.currentTime < filteredData
          );
          setVisibleData(filData);

          console.log(visibleData);
          // console.log(data);
          // console.log(visibleData);
          localStorage.setItem(
            `VISIBLE DATA FOR ${validUrl}`,
            JSON.stringify(visibleData)
          );

          if (toggle) {
            localStorage.setItem(`DATA FOR ${validUrl}`, JSON.stringify(data));
          } else {
            localStorage.removeItem(`DATA FOR ${validUrl}`);
          }
          counter.current = counter.current + 1;
        },
        (error) => {
          console.log(error);

          //   setValidUrl("");
        }
      );
    }
  }, [data, validUrl, toggle, visibleData]);

  const removeData = useCallback(() => {
    if (data.length < 1) {
      return;
    }
    const value =
      localStorage.getItem(`DATA RETENTION FOR ${validUrl}`) || 5000;
    const now = new Date().getTime();
    const cutOff = now - value;
    const oldElementIndex = lastIndexOf(data, cutOff);
    if (oldElementIndex !== -1) {
      setData(data.slice(oldElementIndex));
    }
  }, [data, validUrl]);

  const dataFromThePast = (value) => {
    const now = new Date().getTime();
    const filteredData = now - value;
    const filData = data.filter((data) => data.currentTime < filteredData);
    setVisibleData(filData);
    localStorage.setItem(
      `VISIBLE DATA FOR ${validUrl}`,
      JSON.stringify(visibleData)
    );
    localStorage.setItem(`VISIBLE DATA VALUE FOR ${validUrl}`, value);
  };

  const onCheckboxChange = (e) => {
    setToggle(e.target.checked);
    localStorage.setItem(`TOGGLE FOR ${validUrl}`, e.target.checked);

    if (e.target.checked) {
      localStorage.setItem(`DATA FOR ${validUrl}`, JSON.stringify(data));
    } else {
      // Hidden Bug, removes data
      localStorage.removeItem(`DATA FOR ${validUrl}`);
    }
  };

  return (
    <div>
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
        <DataRetention validUrl={validUrl} removeData={removeData} />
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
      {/* <Chart visibleData={visibleData} /> */}
      <Chart2 visibleData={visibleData} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
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
        <ChartTimeWindow
          dataFromThePast={dataFromThePast}
          validUrl={validUrl}
        />
      </div>
    </div>
  );
};

export default ChartControl;
