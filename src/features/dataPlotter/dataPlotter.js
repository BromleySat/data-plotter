import React, { useState, useCallback, useEffect, useRef } from "react";
import Chart from "../chart/chart";
import { RefreshRate } from "../refreshRate/refreshRate";
import DataRetention from "../dataRetention/dataRetention";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BromleySatSwitch } from "../../components/switch";
import { useTheme } from "@material-ui/core/styles";
import { Container, Typography } from "@mui/material";
import { isLocalIp } from "./validation";
import { validateInput } from "./validation";
import { getApiList } from "./validation";

// import { useForm } from "react-hook-form";

export const storageSetItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const DataPlotter = ({}) => {
  const theme = useTheme();
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("localStorageData") || "[]")
  );
  const [textBoxValue, setTextBoxValue] = useState("");
  const [urlList, setUrlList] = useState(
    JSON.parse(localStorage.getItem("urlList"))
  );
  const [toggle, setToggle] = useState(
    JSON.parse(localStorage.getItem("checked") || false)
  );
  const [error, setError] = useState(false);
  const [validUrl, setValidUrl] = useState();
  const [time, setTime] = useState([]);
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
    [urlList]
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
  }, [urlList, validUrl]);

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fetchingValidUrl, 5000);
    noApiConfigStored(window.location.host);
  }, [noApiConfigStored, fetchingValidUrl]);

  function transformUrl(url) {
    let str = "api/config";
    url = url.slice(0, url.indexOf("api"));
    url = url + str;
    return url;
  }

  const lastIndexOf = (data, cutOff) => {
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].currentTime.getTime() < cutOff) return i;
    }
    return -1;
  };

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

    // for (let t of time) {
    //   const timeDifference = now.getTime() - t.getTime();
    //   if (timeDifference >= value) {
    //     let filteredArray = data.filter((e) => )
    //     setData(filteredArray)
    //     localStorage.removeItem("localStorageData")
    //   }
    // }
  };

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
  }, [data, validUrl, toggle]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(time[0].getTime());
    setError(false);
    const validate = validateInput(textBoxValue);
    if (validate) {
      setError(false);

      storageSetItem("urlList", JSON.stringify(getApiList(textBoxValue)));
    } else {
      setError(true);
    }

    //setData([]);

    //  // setTerm(formData.urlList);
    // localStorage.setItem("api-address", "lalala");
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

  const trimHttp = (urlList) => {
    if (!urlList) {
      return "";
    }
    const results = [];
    for (let url of urlList) {
      if (url.startsWith("http://")) {
        url = url.replace("http://", "");
        results.push(url);
      } else if (url.startsWith("https://")) {
        url = url.replace("https://", "");
        results.push(url);
      }
    }
    return results;
  };

  return (
    <Container>
      <div>
        <form
          autoComplete="off"
          onSubmit={onFormSubmit}
          style={{
            marginTop: "150px",
            textAlign: "center",
          }}
        >
          <TextField
            id="standard-basic"
            variant="standard"
            defaultValue={trimHttp(urlList)}
            multiline={true}
            data-testid={"kierzk"}
            sx={{
              input: {
                color: theme.palette.text.primary,
                minWidth: "350px",
                fontFamily: "Quicksand",
                fontWeight: "700",
              },
            }}
            onChange={(e) => setTextBoxValue(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            style={{
              marginLeft: "20px",
              backgroundColor: "#00C119",
              fontFamily: "Quicksand",
              fontWeight: "700",
            }}
          >
            Update
          </Button>
          {error ? (
            <p
              style={{
                color: "red",
                fontFamily: "Quicksand",
                fontWeight: "700",
              }}
            >
              Please provide valid URL list
            </p>
          ) : null}
        </form>
      </div>
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
    </Container>
  );
};
