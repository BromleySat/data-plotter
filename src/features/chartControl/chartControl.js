import React, { useCallback, useEffect, useRef } from "react";
import DataRetention from "../dataRetention/dataRetention";
import Chart from "../chart/chart";
import { RefreshRate } from "../refreshRate/refreshRate";
import { BromleySatSwitch } from "../../components/switch";
import { isLocalIp } from "../dataPlotter/validation";
import { transformUrl } from "../helpers/transformUrl";
import { lastIndexOf } from "../helpers/lastIndexOf";
import { Typography } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import axios from "axios";

const ChartControl = ({
  validUrl,
  setValidUrl,
  data,
  setData,
  toggle,
  onCheckboxChange,
  setTime,
  urlList,
  setUrlList,
}) => {
  const theme = useTheme();
  const intervalRef = useRef(null);

  const noApiConfigStored = useCallback(
    (ip) => {
      if (!urlList) {
        let str = "/api/config";
        const localIp = isLocalIp(ip);
        if (localIp) {
          setUrlList(ip + str);
        }
      }
    },
    [urlList, setUrlList]
  );

  const fetchingValidUrl = useCallback(async () => {
    if (validUrl) {
      return;
    }
    if (!urlList) {
      return;
    }
    for (const url of urlList) {
      let transformedUrl = transformUrl(url);
      let foundUrl = false;
      await axios.get(transformedUrl).then(
        (res) => {
          if (res.data.deviceId) {
            setValidUrl(url);
            foundUrl = true;
          }
        },
        (error) => {
          console.log("Error " + url);
        }
      );
      console.log("Found Url: " + foundUrl);
      if (foundUrl) {
        break;
      }
    }
  }, [urlList, validUrl, setValidUrl]);

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fetchingValidUrl, 5000);
    noApiConfigStored(window.location.host);
  }, [noApiConfigStored, fetchingValidUrl]);

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
