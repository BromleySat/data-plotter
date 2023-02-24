import React from "react";
import { useSelector } from "react-redux";
import ChartControl from "../ChartControl/ChartControl";
import { TextBox } from "../TextBox/TextBox";
import { Container } from "@mui/material";
import { ChartControlProvider } from "../../context/chartContext/chartControlContext";

export const DataPlotter = () => {
  const { validUrls, devicesId } = useSelector((state) => state.textBox);

  return (
    <Container>
      <TextBox />
      {validUrls.map((validUrl, index) => {
        const deviceIdIndex = devicesId[index];
        return (
          <ChartControlProvider key={`chart_${index}`}>
            <ChartControl validUrl={validUrl} deviceId={deviceIdIndex} />
          </ChartControlProvider>
        );
      })}
    </Container>
  );
};
