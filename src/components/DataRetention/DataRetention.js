import React, { useState, useEffect } from "react";
import { storageSetItem } from "../../helpers/storageSetItem";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@material-ui/core/styles";
import AutoDeleteSharpIcon from "@mui/icons-material/AutoDeleteSharp";
import ControlledTooltip from "../Tooltip/Tooltip";
import {
  useDataRetention,
  useSetDataRetention,
} from "../../context/chartContext/chartControlContext";

const DataRetention = ({ validUrl }) => {
  const dataRetention = useDataRetention();
  const setDataRetention = useSetDataRetention();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const theme = useTheme();

  const handleTooltip = (bool) => {
    setTooltipOpen(bool);
  };

  useEffect(() => {
    if (localStorage.getItem(`DATA RETENTION FOR ${validUrl}`) !== null) {
      setDataRetention(localStorage.getItem(`DATA RETENTION FOR ${validUrl}`));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          labelId="demo-select-small"
          data-testid={`data-retention-${validUrl}`}
          id="demo-select-small"
          value={dataRetention}
          onChange={(e) => {
            storageSetItem(`DATA RETENTION FOR ${validUrl}`, e.target.value);
            setDataRetention(e.target.value);
          }}
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
