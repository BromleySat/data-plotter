import React, { useEffect, useRef } from "react";

export const RefreshRate = ({ term, getData }) => {
  const intervalRef = useRef(null);
  useEffect(() => {
    if (term === "") {
      return;
    }
    const interval = localStorage.getItem("...");
    // TODO: Interval resets every time we get data
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(getData, interval ?? 5000);
  }, [term, getData]);
  const onChangeInterval = (e) => {
    if (term === "") {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(getData, e.target.value);
    localStorage.setItem("...", e.target.value);
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
