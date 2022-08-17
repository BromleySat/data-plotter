import React, { useRef, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@material-ui/core/styles";
import LoopSharpIcon from "@mui/icons-material/LoopSharp";
import ControlledTooltip from "../../components/Tooltip";

export const RefreshRate = ({ validUrl, onChangeInterval }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const theme = useTheme();
  const intervalRefreshRate = useRef(null);

  const handleTooltip = (bool) => {
    setTooltipOpen(bool);
  };

  const handleTooltipClose = () => {
    clearInterval(intervalRefreshRate.current);
    localStorage.setItem("refreshRateTooltip", counter);
    if (localStorage.getItem("refreshRateTooltip") <= 4) {
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
      dataTestId={`refresh-rate-tooltip-${validUrl}`}
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
          onClose={() => handleTooltipClose()}
          labelId="demo-select-small"
          data-testid={`refresh-rate-${validUrl}`}
          id="demo-select-small"
          defaultValue={
            localStorage.getItem(`REFRESH RATE FOR ${validUrl}`) || "1000"
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
          <MenuItem
            data-testid={`refresh-rate-1s-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="1000"
          >
            1s
          </MenuItem>
          <MenuItem
            data-testid={`refresh-rate-5s-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="5000"
          >
            5s
          </MenuItem>
          <MenuItem
            data-testid={`refresh-rate-10s-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="10000"
          >
            10s
          </MenuItem>
          <MenuItem
            data-testid={`refresh-rate-15s-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="15000"
          >
            15s
          </MenuItem>
          <MenuItem
            data-testid={`refresh-rate-20s-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="20000"
          >
            20s
          </MenuItem>
          <MenuItem
            data-testid={`refresh-rate-25s-${validUrl}`}
            style={{ fontFamily: "Quicksand" }}
            value="25000"
          >
            25s
          </MenuItem>
        </Select>
      </FormControl>
    </ControlledTooltip>
  );
};
