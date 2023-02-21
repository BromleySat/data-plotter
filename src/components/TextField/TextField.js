import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isLocalIp,
  getApiList,
  validateInput,
} from "../../helpers/dataPlotter/validation";
import { transformUrl } from "../../helpers/transformUrl";
import { trimHttp } from "../../helpers/trimHttp";
import { storageSetItem } from "../../helpers/storageSetItem";
import axios from "axios";
import "./TextField.css";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import {
  setUrlList,
  setTextBoxValue,
  setError,
  setValidUrls,
  setDevicesId,
} from "../../redux/textFieldSlice";
import Button from "@mui/material/Button";

const TextField = () => {
  const { urlList, textBoxValue, error, validUrls, devicesId } = useSelector(
    (state) => state.textfield
  );
  const intervalRef = useRef(null);
  const theme = useTheme();
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

  const noApiConfigStored = () => {
    const localIp = isLocalIp(window.location.host);
    if (localIp) {
      storageSetItem(
        "urlList",
        JSON.stringify(getApiList(window.location.host))
      );
      console.log(localStorage.getItem("urlList"));
      setUrlList(getApiList(window.location.host));
    }
  };

  const fetchingValidUrl = async () => {
    if (!urlList) {
      return;
    }
    if (validUrls.length === urlList.length) {
      return;
    }
    for (const url of urlList) {
      if (validUrls.indexOf(transformUrl(url, "/api/data")) !== -1) {
        continue;
      }
      let transformedUrl = transformUrl(url, "/api/config");

      await axios.get(transformedUrl).then(
        (res) => {
          if (res.data.deviceId) {
            setDevicesId((devId) => [...devId, res.data.deviceId]);
            setValidUrls((valUrl) => [
              ...valUrl,
              transformUrl(url, "/api/data"),
            ]);
          }
        },
        (error) => {
          console.log("Error " + url);
        }
      );
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      fetchingValidUrl();
    }, 5000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    noApiConfigStored();
  }, []);

  return (
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
  );
};

export default TextField;
