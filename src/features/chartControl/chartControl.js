import React, { useCallback } from "react";
import DataRetention from "../dataRetention/dataRetention";
import Chart from "../chart/chart";
import { RefreshRate } from "../refreshRate/refreshRate";
import { BromleySatSwitch } from "../../components/switch";
import { Typography } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import axios from "axios";

const ChartControl = ({
  removeData,
  validUrl,
  setValidUrl,
  data,
  setData,
  toggle,
  onCheckboxChange,
  setTime,
}) => {
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
          setTime((time) => [...time, res.data.currentTime]);

          if (toggle) {
            localStorage.setItem("localStorageData", JSON.stringify(data));
          } else {
            localStorage.removeItem("localStorageData");
          }
        },
        (error) => {
          console.log(error);

          setValidUrl("");
        }
      );
    }
  }, [data, validUrl, toggle, setData, setTime, setValidUrl]);

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
          Data Plotter
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
