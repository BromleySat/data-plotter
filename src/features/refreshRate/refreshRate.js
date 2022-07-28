import React, { useEffect, useRef } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@material-ui/core/styles";
import LoopSharpIcon from "@mui/icons-material/LoopSharp";

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
        defaultValue={
          localStorage.getItem(`REFRESH RATE FOR ${validUrl}`) || "5000"
        }
        onChange={onChangeInterval}
        sx={{
          color: theme.palette.text.primary,
          fontFamily: "Quicksand",
          fontWeight: "700",
          "& .MuiSvgIcon-root": {
            color: theme.palette.text.primary,
            fontSize: "1.25rem",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.primary,
            borderWidth: "3px",
            borderRadius: "5px",
          },
          "&:hover": {
            "&& fieldset": {
              borderColor: theme.palette.text.primary,
              opacity: "0.5",
            },
          },
        }}
        IconComponent={LoopSharpIcon}
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
