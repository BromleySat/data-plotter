import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle, selectIsDark } from "./darkThemeSlice";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import Checkbox from "@material-ui/core/Checkbox";

export const DarkThemeToggle = () => {
  const darkThemeEnabled = useSelector(selectIsDark);
  const dispatch = useDispatch();

  return (
    <Checkbox
      data-testid="dark-theme-toggle"
      style={{
        position: "absolute",
        top: 6,
        right: 6,
        color: "grey",
      }}
      checked={darkThemeEnabled}
      onChange={() => dispatch(toggle())}
      icon={<WbSunnyIcon />}
      checkedIcon={<NightlightIcon />}
    />
  );
};
