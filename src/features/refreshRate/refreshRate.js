import React from "react";

export const RefreshRate = ({ term, getData }) => {
  let dataInterval;
  const onChangeInterval = (e) => {
    if (term === "") {
      return;
    }
    clearInterval(dataInterval);
    dataInterval = setInterval(getData, e.target.value);
  };
  return (
    <select
      defaultValue={localStorage.getItem("...")}
      onChange={onChangeInterval}
    >
      <option value="5000">5s</option>
      <option value="10000">10s</option>
      <option value="15000">15s</option>
      <option value="20000">20s</option>
      <option value="25000">25s</option>
    </select>
  );
};
