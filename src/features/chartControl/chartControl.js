import React, { useCallback, useState } from "react";
import DataRetention from "../dataRetention/dataRetention";
import { RefreshRate } from "../refreshRate/refreshRate";
import { ChartTimeWindow } from "../chartTimeWindow/chartTimeWindow";
import { BromleySatSwitch } from "../../components/switch";
import { lastIndexOf } from "../helpers/lastIndexOf";
import { Typography } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import axios from "axios";
import Chart from "../chart/chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons";
import "./chartControl.css";

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

  const getData = useCallback(async () => {
    if (validUrl) {
      await axios.get(validUrl).then(
        (res) => {
          const now = new Date().getTime();
          const filteredData =
            now - localStorage.getItem(`VISIBLE DATA VALUE FOR ${validUrl}`);
          res.data.time = new Date().getTime();
          res.data.currentTime = new Date().getTime();
          setData((data) => [...data, res.data]);

          const filData = data.filter(
            (data) => data.currentTime < filteredData
          );
          setVisibleData(filData);
          localStorage.setItem(
            `VISIBLE DATA FOR ${validUrl}`,
            JSON.stringify(visibleData)
          );

          if (toggle) {
            localStorage.setItem(`DATA FOR ${validUrl}`, JSON.stringify(data));
          } else {
            localStorage.removeItem(`DATA FOR ${validUrl}`);
          }
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
    <div style={{ marginBottom: "4em" }}>
      <div className="flex">
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
        <div className="split">
          <FontAwesomeIcon
            style={{ color: theme.palette.text.primary }}
            icon={faMagnifyingGlassMinus}
            className="zoomOut"
          />
          <RefreshRate validUrl={validUrl} getData={getData} />
        </div>
      </div>
      <Chart theme={theme} visibleData={visibleData} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BromleySatSwitch checked={toggle} onChange={onCheckboxChange} />
        <ChartTimeWindow
          dataFromThePast={dataFromThePast}
          validUrl={validUrl}
        />
      </div>
    </div>
  );
};

export default ChartControl;
