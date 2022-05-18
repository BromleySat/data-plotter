import React, { useEffect, useRef } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

export const RefreshRate = ({ term, getData }) => {
  const theme = useTheme();
  const useStyles = makeStyles({
    select: {
      borderColor: theme.palette.text.primary,
    },
  });
  const classes = useStyles();
  const intervalRef = useRef(null);
  useEffect(() => {
    if (term === "") {
      return;
    }
    const interval = localStorage.getItem("...");
    // TODO: Interval resets every time we get data
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(getData, interval ?? 5000);
  }, [term, getData]);
  const onChangeInterval = (e) => {
    if (term === "") {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(getData, e.target.value);
    localStorage.setItem("...", e.target.value);
  };

  return (
    <Select
      defaultValue={localStorage.getItem("...") || "5000"}
      onChange={onChangeInterval}
      sx={{
        color: theme.palette.text.primary,
      }}
      style={{ marginBottom: "20px" }}
    >
      <MenuItem value="5000">5s</MenuItem>
      <MenuItem value="10000">10s</MenuItem>
      <MenuItem value="15000">15s</MenuItem>
      <MenuItem value="20000">20s</MenuItem>
      <MenuItem value="25000">25s</MenuItem>
    </Select>
  );
};
