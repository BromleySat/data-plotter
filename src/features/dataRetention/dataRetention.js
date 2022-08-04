import React, { useEffect, useRef } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@material-ui/core/styles";
import AutoDeleteSharpIcon from "@mui/icons-material/AutoDeleteSharp";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    color: "#fff",
    fontFamily: "Quicksand",
    fontWeight: "700",
    fontSize: ".8rem",
    backgroundColor: "#00C119",
    maxWidth: "150px",
  },
  arrow: {
    color: "#00C119",
  },
}));

const DataRetention = ({ removeData, validUrl }) => {
  const classes = useStyles();
  const theme = useTheme();
  const intervalRef = useRef(null);
  useEffect(() => {
    // if (intervalRef.current !== null) {
    //   return;
    // }
    clearInterval(intervalRef.current);
    // TODO: Interval resets every time we get data
    intervalRef.current = setInterval(removeData, 5000);
  }, [removeData, intervalRef]);

  const onChangeInterval = (e) => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(removeData, e.target.value);
    localStorage.setItem(`DATA RETENTION FOR ${validUrl}`, e.target.value);
  };
  return (
    <Tooltip
      title={
        <React.Fragment>
          <h3 style={{ margin: 0 }}>Data Retention</h3>
          <br />
          And here's some amazing content It's very engaging. Right?
        </React.Fragment>
      }
      arrow
      placement="top"
      classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
    >
      <FormControl sx={{ minWidth: 65 }} size="small" variant="outlined">
        <InputLabel
          id="demo-select-small"
          sx={{
            color: theme.palette.text.primary,
            fontFamily: "Quicksand",
            fontWeight: "700",
          }}
        />
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          onChange={onChangeInterval}
          defaultValue={
            localStorage.getItem(`DATA RETENTION FOR ${validUrl}`) || 5000
          }
          IconComponent={AutoDeleteSharpIcon}
          sx={{
            color: theme.palette.text.primary,
            "& .MuiSvgIcon-root": {
              color: theme.palette.text.primary,
              fontSize: "1.25rem",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.primary,
              borderWidth: "3px",
              borderRadius: "5px",
            },
            "&.MuiOutlinedInput-root": {
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00C119",
                  borderWidth: "3px",
                  borderRadius: "5px",
                },
              },
            },
            "&:hover": {
              "&& fieldset": {
                borderColor: theme.palette.text.primary,
                opacity: "0.5",
              },
            },
            ".MuiSelect-icon": {
              transform: "none",
            },
            "@media (max-width: 40em)": {
              "& .MuiSelect-select": {
                fontSize: "0.75rem",
              },
              "& .MuiSvgIcon-root": {
                fontSize: "1rem",
              },
            },
            "@media (min-width: 40em) and (max-width: 60em)": {
              "& .MuiSelect-select": {
                fontSize: "0.80rem",
              },
              "& .MuiSvgIcon-root": {
                fontSize: "1rem",
              },
            },
            fontFamily: "Quicksand",
            fontWeight: "700",
          }}
        >
          <MenuItem style={{ fontFamily: "Quicksand" }} value="5000">
            5s
          </MenuItem>
          <MenuItem style={{ fontFamily: "Quicksand" }} value="10000">
            10s
          </MenuItem>
          <MenuItem style={{ fontFamily: "Quicksand" }} value="30000">
            30s
          </MenuItem>
          <MenuItem style={{ fontFamily: "Quicksand" }} value="300000">
            5min
          </MenuItem>
          <MenuItem style={{ fontFamily: "Quicksand" }} value="900000">
            15min
          </MenuItem>
          <MenuItem style={{ fontFamily: "Quicksand" }} value="1800000">
            30min
          </MenuItem>
          <MenuItem style={{ fontFamily: "Quicksand" }} value="3600000">
            1hr
          </MenuItem>
          <MenuItem style={{ fontFamily: "Quicksand" }} value="21600000">
            6hrs
          </MenuItem>
          <MenuItem style={{ fontFamily: "Quicksand" }} value="43200000">
            12hrs
          </MenuItem>
          <MenuItem style={{ fontFamily: "Quicksand" }} value="86400000">
            24hrs
          </MenuItem>
          <MenuItem style={{ fontFamily: "Quicksand" }} value="259200000">
            3d
          </MenuItem>
          <MenuItem style={{ fontFamily: "Quicksand" }} value="604800000">
            7d
          </MenuItem>
          <MenuItem style={{ fontFamily: "Quicksand" }} value="1814400000">
            21d
          </MenuItem>
        </Select>
      </FormControl>
    </Tooltip>
  );
};

export default DataRetention;
