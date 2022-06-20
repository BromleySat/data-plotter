import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@material-ui/core/styles";

export const ChartTimeWindow = ({ dataFromThePast, validUrl }) => {
  const theme = useTheme();
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
        Chart Time Window
      </InputLabel>

      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        label="Data Retention"
        value={
          localStorage.getItem(`VISIBLE DATA VALUE FOR ${validUrl}`) || "5000"
        }
        onChange={(e) => dataFromThePast(e.target.value)}
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
        <MenuItem style={{ fontFamily: "Quicksand" }} value="30000">
          30s
        </MenuItem>
        <MenuItem style={{ fontFamily: "Quicksand" }} value="300000">
          5 min
        </MenuItem>
        <MenuItem style={{ fontFamily: "Quicksand" }} value="900000">
          15 min
        </MenuItem>
        <MenuItem style={{ fontFamily: "Quicksand" }} value="1800000">
          30 min
        </MenuItem>
        <MenuItem style={{ fontFamily: "Quicksand" }} value="3600000">
          1 hr
        </MenuItem>
        <MenuItem style={{ fontFamily: "Quicksand" }} value="21600000">
          6 hrs
        </MenuItem>
        <MenuItem style={{ fontFamily: "Quicksand" }} value="43200000">
          12 hrs
        </MenuItem>
        <MenuItem style={{ fontFamily: "Quicksand" }} value="86400000">
          24 hrs
        </MenuItem>
        <MenuItem style={{ fontFamily: "Quicksand" }} value="259200000">
          3 days
        </MenuItem>
        <MenuItem style={{ fontFamily: "Quicksand" }} value="604800000">
          7 days
        </MenuItem>
        <MenuItem style={{ fontFamily: "Quicksand" }} value="1814400000">
          21 days
        </MenuItem>
      </Select>
    </FormControl>
  );
};
