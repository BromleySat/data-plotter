import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getApiList, validateInput } from "../../helpers/textBox/validation";
import { trimHttp } from "../../helpers/trimHttp";
import { storageSetItem } from "../../helpers/storageSetItem";
import { useTextbox } from "../../hooks/textBox/useTextbox";
import "./TextBox.css";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import {
  setUrlList,
  setTextBoxValue,
  setError,
  resetValidUrls,
  resetDevicesId,
} from "../../redux/textBox/textBoxSlice";

export const TextBox = () => {
  const { urlList, textBoxValue, error } = useSelector(
    (state) => state.textBox
  );
  const dispatch = useDispatch();
  const theme = useTheme();

  useTextbox();

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

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setError(false));
    const validate = validateInput(textBoxValue);
    if (validate) {
      dispatch(setError(false));
      storageSetItem("urlList", JSON.stringify(getApiList(textBoxValue)));
      dispatch(setUrlList(getApiList(textBoxValue)));
      dispatch(resetValidUrls());
      dispatch(resetDevicesId());
    } else {
      dispatch(setError(true));
    }
  };

  return (
    <div className="textfield-container">
      <TextField
        variant="standard"
        defaultValue={trimHttp(urlList)}
        multiline={true}
        onChange={(e) => dispatch(setTextBoxValue(e.target.value))}
        data-testid="text-area"
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
        onClick={(e) => onFormSubmit(e)}
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
        <p data-testid="error" className="textboxError">
          Please provide valid URL list
        </p>
      ) : null}
    </div>
  );
};
