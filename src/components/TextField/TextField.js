import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  isLocalIp,
  getApiList,
  validateInput,
} from "../../helpers/dataPlotter/validation";
import { trimHttp } from "../../helpers/trimHttp";
import { storageSetItem } from "../../helpers/storageSetItem";
import { useFetchValidUrls } from "../../hooks/useFetchValidUrls";
import "./TextField.css";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import {
  setUrlList,
  setTextBoxValue,
  setError,
  setValidUrls,
  setDevicesId,
} from "../../redux/textFieldSlice";

export const TextField = () => {
  const { urlList, textBoxValue, error } = useSelector(
    (state) => state.textfield
  );
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
    noApiConfigStored();
  }, []);

  useFetchValidUrls();

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
