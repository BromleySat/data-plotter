import React, { useEffect, useRef, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@material-ui/core/styles";
import LoopSharpIcon from "@mui/icons-material/LoopSharp";
import ControlledTooltip from "../../components/Tooltip";

export const RefreshRate = ({ validUrl, getData }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
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

  const handleTooltip = (bool) => {
    setTooltipOpen(bool);
  };

  return (
    <ControlledTooltip
      title="Refresh Rate"
      content="And here's some amazing content It's very engaging. Right?"
      open={tooltipOpen}
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
          onMouseEnter={() => {
            handleTooltip(true);
          }}
          onMouseLeave={() => {
            handleTooltip(false);
          }}
          onOpen={() => {
            handleTooltip(false);
          }}
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

            "&.MuiOutlinedInput-root": {
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00C119",
                  borderWidth: "3px",
                  borderRadius: "5px",
                },
              },
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
                fontSize: "0.85rem",
              },
              "& .MuiSvgIcon-root": {
                fontSize: "1rem",
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
    </ControlledTooltip>
  );
};
