import React from "react";
import { useSelector } from "react-redux";
import ChartControl from "../ChartControl/ChartControl";
import { TextBox } from "../TextBox/TextBox";
import { Container } from "@mui/material";

export const DataPlotter = () => {
  const { validUrls, devicesId } = useSelector((state) => state.textfield);
  console.log(validUrls);

  return (
    <Container>
      <TextBox />
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
