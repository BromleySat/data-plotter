import { styled } from "@mui/material/styles";
import { Switch } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDataLocalStorageToggle } from "../../redux/dataLocalStorageToggle/dataLocalStorageToggleSlice";
import ControlledTooltip from "../Tooltip/Tooltip";

const StyledBromleySatSwitch = styled(Switch)(({ theme }) => ({
  width: 52,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const BromleySatSwitch = ({ validUrl }) => {
  const { data } = useSelector((state) => state.data);
  const { dataLocalStorageToggle } = useSelector(
    (state) => state.dataLocalStorageToggle
  );
  const dispatch = useDispatch();

  const onCheckboxChange = (e) => {
    dispatch(setDataLocalStorageToggle(e.target.checked));
    localStorage.setItem(`TOGGLE FOR ${validUrl}`, e.target.checked);

    if (e.target.checked) {
      localStorage.setItem(`DATA FOR ${validUrl}`, JSON.stringify(data));
    } else {
      localStorage.removeItem(`DATA FOR ${validUrl}`);
    }
  };
  return (
    <ControlledTooltip
      data-testid={`local-storage-tooltip-${validUrl}`}
      title="Local Storage"
      content="And here's some amazing content It's very engaging. Right?"
    >
      <StyledBromleySatSwitch
        data-testid={`local-storage-${validUrl}`}
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        checked={dataLocalStorageToggle}
        onChange={onCheckboxChange}
      />
    </ControlledTooltip>
  );
};
