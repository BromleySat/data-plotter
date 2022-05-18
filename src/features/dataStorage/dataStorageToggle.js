import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle, toggleDataStorage } from "./dataStorageSlice";
import { BromleySatSwitch } from "../../components/switch";

export const DataStorageToggle = () => {
  const localStorageToggled = useSelector(toggleDataStorage);
  const dispatch = useDispatch();

  return (
    <BromleySatSwitch
      checked={localStorageToggled}
      onChange={() => dispatch(toggle())}
    />
  );
};
