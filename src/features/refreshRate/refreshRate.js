import React, { useEffect, useRef } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@material-ui/core/styles";

export const RefreshRate = ({ validUrl, getData }) => {
  const theme = useTheme();
  const intervalRef = useRef(null);
  useEffect(() => {
    if (validUrl === undefined) {
      return;
    }
    const interval = localStorage.getItem(`REFRESH RATE FOR ${validUrl}`);
    // TODO: Interval resets every time we get data
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(getData, interval ?? 5000);
  }, [validUrl, getData]);
  const onChangeInterval = (e) => {
    if (validUrl === "") {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(getData, e.target.value);
    localStorage.setItem(`REFRESH RATE FOR ${validUrl}`, e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="outlined">
      <InputLabel
        id="demo-select-small"
        sx={{
          color: theme.palette.text.primary,
          fontFamily: "Quicksand",
          fontWeight: "700",
        }}
      >
        Refresh Rate
      </InputLabel>

      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        defaultValue={
          localStorage.getItem(`REFRESH RATE FOR ${validUrl}`) || "5000"
        }
        label="Refresh Rate"
        onChange={onChangeInterval}
        sx={{
          color: theme.palette.text.primary,
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
        <MenuItem style={{ fontFamily: "Quicksand" }} value="15000">
          15s
        </MenuItem>
        <MenuItem style={{ fontFamily: "Quicksand" }} value="20000">
          20s
        </MenuItem>
        <MenuItem style={{ fontFamily: "Quicksand" }} value="25000">
          25s
        </MenuItem>
      </Select>
    </FormControl>
  );
};
