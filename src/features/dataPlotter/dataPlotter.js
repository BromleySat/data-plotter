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
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./dataPlotter.css";

export const storageSetItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const DataPlotter = () => {
  const publicApi = "https://api.bromleysat.space";
  const theme = useTheme();
  const intervalRef = useRef(null);
  const [urlList, setUrlList] = useState(
    JSON.parse(localStorage.getItem("urlList")) || [publicApi]
  );
  const [textBoxValue, setTextBoxValue] = useState(trimHttp(urlList).join(","));
  const [error, setError] = useState(false);
  const [validUrls, setValidUrls] = useState([]);

  const [devicesId, setDevicesId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState();

  const useStyles = makeStyles({
    root: {
      "&::before": {
        borderBottom: `1px solid ${theme.palette.text.primary}`,
        display: "none",
      },
      "&::after": {
        borderBottom: `1px solid ${theme.palette.text.primary}`,
        display: "none",
      },
      "& .MuiInput-input": {
        minWidth: "350px",
        fontFamily: "Quicksand",
        fontWeight: "700",
        color: `${theme.palette.text.primary}`,
        borderBottom: `1px solid ${theme.palette.text.primary}`,
      },
      "@media (max-width: 30em)": {
        "& .MuiInput-input": {
          minWidth: "275px",
        },
      },
    },
    disabled: {},
    notchedOutline: {},
  });

  const classes = useStyles();

  // const StyledTextField = styled(TextField)`
  //   & .MuiInput-input {
  //     min-width: 350px;
  //     font-family: Quicksand;
  //     color: ;
  //   }
  // `;

  const noApiConfigStored = useCallback(() => {
    const localIp = isLocalIp(window.location.host);
    if (localIp) {
      storageSetItem(
        "urlList",
        JSON.stringify(getApiList(window.location.host))
      );
      console.log(localStorage.getItem("urlList"));
      setUrlList(getApiList(window.location.host));
    }
  }, [setUrlList]);

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
      let transformedUrl = transformUrl(url, "/api/config");
      if (loading) {
        return;
      }
      setLoading(true);
      await axios.get(transformedUrl).then(
        (res) => {
          if (res.data.deviceId) {
            setDevicesId((devId) => [...devId, res.data.deviceId]);
            setValidUrls((valUrl) => [
              ...valUrl,
              transformUrl(url, "/api/data"),
            ]);
          }
          setLoading(false);
        },
        (error) => {
          console.log("Error " + url);
        }
      );
    }
  }, [urlList, validUrls, loading]);

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      fetchingValidUrl();
    }, 5000);
  }, [fetchingValidUrl]);

  useEffect(() => {
    noApiConfigStored();
  }, [noApiConfigStored]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    clearInterval(running);
    setError(false);
    const validate = validateInput(textBoxValue);
    if (validate) {
      setError(false);

      storageSetItem("urlList", JSON.stringify(getApiList(textBoxValue)));
      setUrlList(getApiList(textBoxValue));
      setValidUrls([]);
      setDevicesId([]);
    } else {
      setError(true);
    }
  };

  return (
    <Container>
      <div className="textfield-container">
        <TextField
          id="standard-basic"
          variant="standard"
          defaultValue={trimHttp(urlList)}
          multiline={true}
          onChange={(e) => setTextBoxValue(e.target.value)}
          inputProps={{
            "data-testid": "text-area",
          }}
          InputProps={{
            classes: {
              root: classes.root,
              disabled: classes.disabled,
              notchedOutline: classes.notchedOutline,
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="small"
          onClick={onFormSubmit}
          data-testid="text-area-submit"
          style={{
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
      {validUrls.map((validUrl, index) => {
        const deviceIdIndex = devicesId[index];
        return (
          <ChartControl
            setRunning={setRunning}
            running={running}
            key={`chart_${index}`}
            validUrl={validUrl}
            deviceId={deviceIdIndex}
          />
        );
      })}
    </Container>
  );
};
