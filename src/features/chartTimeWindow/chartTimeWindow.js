import React, { useState, useRef } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@material-ui/core/styles";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ControlledTooltip from "../../components/Tooltip";

export const ChartTimeWindow = ({
  dataFromThePast,
  setVisibleData,
  validUrl,
}) => {
  const theme = useTheme();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef(null);

  const handleTooltip = (bool) => {
    setTooltipOpen(bool);
  };

  const handleTooltipClose = () => {
    clearInterval(intervalRef.current);
    localStorage.setItem("chartTimeWindowTooltip", counter);
    if (localStorage.getItem("chartTimeWindowTooltip") <= 4) {
      intervalRef.current = setInterval(() => {
        setTooltipOpen(false);
      }, 5000);
    } else {
      setTooltipOpen(false);
    }
    setCounter((counter) => counter + 1);
  };

  return (
    <ControlledTooltip
      dataTestId={`chart-time-window-tooltip-${validUrl}`}
      open={tooltipOpen}
      title="Chart Time Window"
      content="And here's some amazing content It's very engaging. Right?"
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
          onMouseEnter={() => handleTooltip(true)}
          onMouseLeave={() => handleTooltip(false)}
          onOpen={() => handleTooltip(false)}
          onClose={() => {
            handleTooltipClose();
          }}
          labelId="demo-select-small"
          data-testid={`chart-time-window-${validUrl}`}
          id="demo-select-small"
          value={
            localStorage.getItem(`VISIBLE DATA VALUE FOR ${validUrl}`) ||
            `300000`
          }
          onChange={(e) => setVisibleData(dataFromThePast(e.target.value))}
          IconComponent={EqualizerIcon}
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
            "&:focus": {
              "&& .MuiOutlinedInput-root": {
                borderColor: "red",
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
                fontSize: "0.85rem",
              },
              "& .MuiSvgIcon-root": {
                fontSize: "1rem",
              },
            },
          }}
        >
          <MenuItem
            data-testid={`chart-time-window-5s-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="5000"
          >
            5s
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-10s-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="10000"
          >
            10s
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-30s-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="30000"
          >
            30s
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-5m-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="300000"
          >
            5m
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-15m-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="900000"
          >
            15m
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-30m-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="1800000"
          >
            30m
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-1hr-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="3600000"
          >
            1hr
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-6hrs-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="21600000"
          >
            6hrs
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-12hrs-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="43200000"
          >
            12hrs
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-24hrs-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="86400000"
          >
            24hrs
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-3d-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="259200000"
          >
            3d
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-7d-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="604800000"
          >
            7d
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-21d-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="1814400000"
          >
            21d
          </MenuItem>
        </Select>
      </FormControl>
    </ControlledTooltip>
  );
};
