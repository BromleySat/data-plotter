import React from "react";
import DataRetention from "../dataRetention/dataRetention";
import { RefreshRate } from "../refreshRate/refreshRate";
import { Typography } from "@mui/material";

const ChartControl = ({ removeData, validUrl, getData }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <DataRetention removeData={removeData} />
      <Typography
        variant="h4"
        style={{
          color: "#00C119",
          fontFamily: "Quicksand",
          fontWeight: "700",
        }}
      >
        Data Plotter
      </Typography>
      <RefreshRate validUrl={validUrl} getData={getData} />
    </div>
  );
};

export default ChartControl;
