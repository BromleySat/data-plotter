import React, { useCallback, useState, useEffect, useRef } from "react";
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
import ControlledTooltip from "../../components/Tooltip";

const ChartControl = ({ validUrl, deviceId, setRunning, running }) => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem(`DATA FOR ${validUrl}`) || "[]")
  );
  const [visibleData, setVisibleData] = useState([]);
  // JSON.parse(localStorage.getItem(`VISIBLE DATA FOR ${validUrl}`) || "[]")
  const [toggle, setToggle] = useState(
    JSON.parse(localStorage.getItem(`TOGGLE FOR ${validUrl}`) || false)
  );
  const [zoomedOut, setZoomedOut] = useState({ value: false });
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const intervalRef = useRef(null);

  const dataFromThePast = useCallback(
    (value) => {
      const now = new Date().getTime();
      const filteredData = now - value;
      const filData = data.filter((dat) => dat.currentTime > filteredData);
      localStorage.setItem(
        `VISIBLE DATA FOR ${validUrl}`,
        JSON.stringify(visibleData)
      );
      localStorage.setItem(`VISIBLE DATA VALUE FOR ${validUrl}`, value);
      return filData;
    },
    [validUrl, visibleData, data]
  );

  const getData = useCallback(async () => {
    if (validUrl) {
      if (loading) {
        return;
      }
      setLoading(true);
      await axios.get(validUrl).then(
        (res) => {
          // const now = new Date().getTime();
          // const filteredData =
          //   now - localStorage.getItem(`VISIBLE DATA VALUE FOR ${validUrl}`);
          res.data.time = new Date().getTime();
          res.data.currentTime = new Date().getTime();
          setData((data) => [...data, res.data]);

          // const filData = data.filter(
          //   (data) => data.currentTime < filteredData
          // );
          // setVisibleData(filData);
          // localStorage.setItem(
          //   `VISIBLE DATA FOR ${validUrl}`,
          //   JSON.stringify(visibleData)
          // );
          console.log(validUrl);
          const dataFromThePastValue =
            localStorage.getItem(`VISIBLE DATA VALUE FOR ${validUrl}`) ||
            `300000`;
          setVisibleData(dataFromThePast(dataFromThePastValue));
          setLoading(false);

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
  }, [data, validUrl, toggle, dataFromThePast, loading]);

  const removeData = useCallback(() => {
    if (data.length < 1) {
      return;
    }
    const value =
      localStorage.getItem(`DATA RETENTION FOR ${validUrl}`) || 1814400000;
    const now = new Date().getTime();
    const cutOff = now - value;
    const oldElementIndex = lastIndexOf(data, cutOff);
    if (oldElementIndex !== -1) {
      setData(data.slice(oldElementIndex));
    }
  }, [data, validUrl]);

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

  useEffect(() => {
    if (validUrl === undefined) {
      return;
    }
    const interval = localStorage.getItem(`REFRESH RATE FOR ${validUrl}`);
    // TODO: Interval resets every time we get data
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(getData, interval ?? 1000);
    setRunning(intervalRef.current);
  }, [validUrl, getData, setRunning]);

  const onChangeInterval = (e) => {
    if (validUrl === "") {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(getData, e.target.value);
    localStorage.setItem(`REFRESH RATE FOR ${validUrl}`, e.target.value);
    console.log(visibleData);
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
          <ControlledTooltip
            title="Zoom Out"
            data-testid={`zoom-out-tooltip-${validUrl}`}
          >
            <FontAwesomeIcon
              data-testid={`zoom-out-${validUrl}`}
              style={{ color: theme.palette.text.primary }}
              icon={faMagnifyingGlassMinus}
              className="zoomOut"
              onClick={() => setZoomedOut({ value: true })}
            />
          </ControlledTooltip>

          <RefreshRate
            onChangeInterval={onChangeInterval}
            validUrl={validUrl}
          />
        </div>
      </div>
      <Chart
        zoomedOut={zoomedOut}
        theme={theme}
        visibleData={visibleData}
        currentUrl={validUrl}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BromleySatSwitch
          currentUrl={validUrl}
          checked={toggle}
          onChange={onCheckboxChange}
        />
        <ChartTimeWindow
          dataFromThePast={dataFromThePast}
          validUrl={validUrl}
          setVisibleData={setVisibleData}
        />
      </div>
    </div>
  );
};

export default ChartControl;
