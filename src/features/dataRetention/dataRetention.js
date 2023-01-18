import React, { useEffect, useRef, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@material-ui/core/styles";
import AutoDeleteSharpIcon from "@mui/icons-material/AutoDeleteSharp";
import ControlledTooltip from "../../components/Tooltip";

const DataRetention = ({ removeData, validUrl }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const theme = useTheme();
  const intervalRef = useRef(null);
  const intervalRefreshRate = useRef(null);
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

  const handleTooltip = (bool) => {
    setTooltipOpen(bool);
  };

  const handleTooltipClose = () => {
    clearInterval(intervalRefreshRate.current);
    localStorage.setItem("dataRetentionTooltip", counter);
    if (localStorage.getItem("dataRetentionTooltip") <= 4) {
      intervalRefreshRate.current = setInterval(() => {
        setTooltipOpen(false);
      }, 5000);
    } else {
      setTooltipOpen(false);
    }
    setCounter((counter) => counter + 1);
  };

  return (
    <ControlledTooltip
      dataTestId={`data-retention-tooltip-${validUrl}`}
      title="Data Retention"
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
          onClose={() => handleTooltipClose()}
          labelId="demo-select-small"
          data-testid={`data-retention-${validUrl}`}
          id="demo-select-small"
          onChange={onChangeInterval}
          value={
            localStorage.getItem(`DATA RETENTION FOR ${validUrl}`)
              ? localStorage.getItem(`DATA RETENTION FOR ${validUrl}`)
              : 1814400000
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
          <MenuItem
            data-testid={`data-retention-5s-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="5000"
          >
            5s
          </MenuItem>
          <MenuItem
            data-testid={`data-retention-10s-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="10000"
          >
            10s
          </MenuItem>
          <MenuItem
            data-testid={`data-retention-30s-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="30000"
          >
            30s
          </MenuItem>
          <MenuItem
            data-testid={`data-retention-5min-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="300000"
          >
            5min
          </MenuItem>
          <MenuItem
            data-testid={`data-retention-15min-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="900000"
          >
            15min
          </MenuItem>
          <MenuItem
            data-testid={`data-retention-30min-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="1800000"
          >
            30min
          </MenuItem>
          <MenuItem
            data-testid={`data-retention-1hr-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="3600000"
          >
            1hr
          </MenuItem>
          <MenuItem
            data-testid={`data-retention-6hrs-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="21600000"
          >
            6hrs
          </MenuItem>
          <MenuItem
            data-testid={`data-retention-12hrs-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="43200000"
          >
            12hrs
          </MenuItem>
          <MenuItem
            data-testid={`data-retention-24hrs-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="86400000"
          >
            24hrs
          </MenuItem>
          <MenuItem
            data-testid={`data-retention-3d-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="259200000"
          >
            3d
          </MenuItem>
          <MenuItem
            data-testid={`data-retention-7d-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="604800000"
          >
            7d
          </MenuItem>
          <MenuItem
            data-testid={`data-retention-21d-${validUrl}`}
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

export default DataRetention;
