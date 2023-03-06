import React, { useState, useEffect } from "react";
import { storageSetItem } from "../../helpers/storageSetItem";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@material-ui/core/styles";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ControlledTooltip from "../Tooltip/Tooltip";
import {
  useChartTimeWindow,
  useSetChartTimeWindow,
} from "../../context/chartContext/chartControlContext";

export const ChartTimeWindow = ({ validUrl }) => {
  const chartTimeWindow = useChartTimeWindow();
  const setChartTimeWindow = useSetChartTimeWindow();
  const theme = useTheme();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltip = (bool) => {
    setTooltipOpen(bool);
  };

  useEffect(() => {
    if (localStorage.getItem(`CHART TIME WINDOW FOR ${validUrl}`) !== null) {
      setChartTimeWindow(
        localStorage.getItem(`CHART TIME WINDOW FOR ${validUrl}`)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ControlledTooltip
      dataTestId={`chart-time-window-tooltip-${validUrl}`}
      open={tooltipOpen}
      title="Visible Data"
      content="Display the data on the chart based on the selected value."
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
          labelId="demo-select-small"
          data-testid={`chart-time-window-${validUrl}`}
          id="demo-select-small"
          value={chartTimeWindow}
          onChange={(e) => {
            storageSetItem(`CHART TIME WINDOW FOR ${validUrl}`, e.target.value);
            setChartTimeWindow(e.target.value);
          }}
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
            data-testid={`chart-time-window-25s-${validUrl}`}
            sx={{ fontFamily: "Quicksand" }}
            value="25000"
          >
            25s
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-5m-${validUrl}`}
            sx={{ fontFamily: "Quicksand" }}
            value="300000"
          >
            5m
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-15m-${validUrl}`}
            sx={{ fontFamily: "Quicksand" }}
            value="900000"
          >
            15m
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-30m-${validUrl}`}
            sx={{ fontFamily: "Quicksand" }}
            value="1800000"
          >
            30m
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-1hr-${validUrl}`}
            sx={{ fontFamily: "Quicksand" }}
            value="3600000"
          >
            1hr
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-6hrs-${validUrl}`}
            sx={{ fontFamily: "Quicksand" }}
            value="21600000"
          >
            6hrs
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-12hrs-${validUrl}`}
            sx={{ fontFamily: "Quicksand" }}
            value="43200000"
          >
            12hrs
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-24hrs-${validUrl}`}
            sx={{ fontFamily: "Quicksand" }}
            value="86400000"
          >
            24hrs
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-3d-${validUrl}`}
            sx={{ fontFamily: "Quicksand" }}
            value="259200000"
          >
            3d
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-7d-${validUrl}`}
            sx={{ fontFamily: "Quicksand" }}
            value="604800000"
          >
            7d
          </MenuItem>
          <MenuItem
            data-testid={`chart-time-window-21d-${validUrl}`}
            sx={{ fontFamily: "Quicksand" }}
            value="1814400000"
          >
            21d
          </MenuItem>
        </Select>
      </FormControl>
    </ControlledTooltip>
  );
};
