import React, { useState, useCallback, useEffect, useRef } from "react";
import ChartControl from "../chartControl/chartControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from "@material-ui/core/styles";
import { Container } from "@mui/material";
import { validateInput } from "./validation";
import { getApiList } from "./validation";
import { trimHttp } from "../helpers/trimHttp";
import { isLocalIp } from "./validation";
import { transformUrl } from "../helpers/transformUrl";
import axios from "axios";

export const storageSetItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const DataPlotter = ({}) => {
  const theme = useTheme();
  const intervalRef = useRef(null);
  const [textBoxValue, setTextBoxValue] = useState("");
  const [error, setError] = useState(false);
  const [validUrls, setValidUrls] = useState([]);
  const [urlList, setUrlList] = useState(
    JSON.parse(localStorage.getItem("urlList"))
  );
  const [devicesId, setDevicesId] = useState([]);

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
    if (!urlList) {
      return;
    }
    if (validUrls.length === urlList.length) {
      return;
    }
    for (const url of urlList) {
      if (validUrls.indexOf(url) !== -1) {
        continue;
      }
      let transformedUrl = transformUrl(url);
      await axios.get(transformedUrl).then(
        (res) => {
          if (res.data.deviceId) {
            setDevicesId((devId) => [...devId, res.data.deviceId]);
            setValidUrls((valUrl) => [...valUrl, url]);
          }
        },
        (error) => {
          console.log("Error " + url);
        }
      );
    }
  }, [urlList, validUrls]);

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fetchingValidUrl, 5000);
    noApiConfigStored(window.location.host);
  }, [noApiConfigStored, fetchingValidUrl]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setError(false);
    const validate = validateInput(textBoxValue);
    if (validate) {
      setError(false);

      storageSetItem("urlList", JSON.stringify(getApiList(textBoxValue)));
    } else {
      setError(true);
    }

    //setData([]);
  };

  return (
    <Container style={{ height: "100%" }}>
      <div>
        <div
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
            sx={{
              input: {
                color: theme.palette.text.primary,
                minWidth: "350px",
                fontFamily: "Quicksand",
                fontWeight: "700",
              },
            }}
            onChange={(e) => setTextBoxValue(e.target.value)}
            inputProps={{ "data-testid": "text-area" }}
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            onClick={onFormSubmit}
            data-testid="text-area-submit"
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
              data-testid="error"
              style={{
                color: "red",
                fontFamily: "Quicksand",
                fontWeight: "700",
              }}
            >
              Please provide valid URL list
            </p>
          ) : null}
        </div>
      </div>
      {validUrls.map((validUrl, index) => {
        const deviceIdIndex = devicesId[index];
        return (
          <ChartControl
            key={`chart_${index}`}
            validUrl={validUrl}
            deviceId={deviceIdIndex}
          />
        );
      })}
    </Container>
  );
};
