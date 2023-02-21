import React from "react";
import { useSelector } from "react-redux";
import ChartControl from "../ChartControl/ChartControl";
import { TextField } from "../TextField/TextField";
import { Container } from "@mui/material";

export const DataPlotter = () => {
  const { validUrls, devicesId } = useSelector((state) => state.textfield);

  return (
    <Container>
      <TextField />
      {validUrls.map((validUrl, index) => {
        const deviceIdIndex = devicesId[index];
        return (
          <ChartControl
            key={`chart_${index}`}
            validUrl={validUrl}
            deviceId={deviceIdIndex}
          />
        );
      })}
    </Container>
  );
};
