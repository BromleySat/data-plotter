import React, { useState, useRef, useCallback } from "react";
import "./inputBox.css";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import { trimHttp } from "../helpers/trimHttp";
import { storageSetItem } from "../helpers/storageSetItem";
import { getApiList } from "./validation";
import { isLocalIp } from "./validation";

const InputBox = () => {
  const theme = useTheme();
  const intervalRef = useRef(null);
  const publicApi = "https://api.bromleysat.space";
  const [urlList, setUrlList] = useState(
    JSON.parse(localStorage.getItem("urlList")) || [publicApi]
  );
  const [textBoxValue, setTextBoxValue] = useState(trimHttp(urlList).join(","));
  const [error, setError] = useState(false);
  const [validUrls, setValidUrls] = useState([]);
  const [devicesId, setDevicesId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState([]);
  const getDataRef = useRef();

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
  return <div>InputBox</div>;
};

export default InputBox;
