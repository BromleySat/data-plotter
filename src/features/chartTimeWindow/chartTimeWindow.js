import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@material-ui/core/styles";
import EqualizerIcon from "@mui/icons-material/Equalizer";

export const ChartTimeWindow = ({ dataFromThePast, validUrl }) => {
  const theme = useTheme();
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
        label="Data Retention"
        value={
          localStorage.getItem(`VISIBLE DATA VALUE FOR ${validUrl}`) || "5000"
        }
        onChange={(e) => dataFromThePast(e.target.value)}
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
          5m
        </MenuItem>
        <MenuItem style={{ fontFamily: "Quicksand" }} value="900000">
          15m
        </MenuItem>
        <MenuItem style={{ fontFamily: "Quicksand" }} value="1800000">
          30m
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
  );
};
