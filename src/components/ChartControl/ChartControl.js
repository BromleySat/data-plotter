import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons";
import "./ChartControl.css";
import Chart from "../Chart/Chart";
import ControlledTooltip from "../Tooltip/Tooltip";
import DataRetention from "../DataRetention/DataRetention";
import { RefreshRate } from "../RefreshRate/RefreshRate";
import { ChartTimeWindow } from "../ChartTimeWindow/ChartTimeWindow";
import { BromleySatSwitch } from "../Switch/Switch";
import {
  useSetLeft,
  useSetRight,
  useSetRefAreaLeft,
  useSetRefAreaRight,
  useDataLocalStorageToggle,
  useSetDataLocalStorageToggle,
  useData,
  useSetData,
} from "../../context/chartContext/chartControlContext";
import { useFetchData } from "../../hooks/useFetchData";

const ChartControl = ({ validUrl, deviceId }) => {
  const dataLocalStorageToggle = useDataLocalStorageToggle();
  const setDataLocalStorageToggle = useSetDataLocalStorageToggle();
  const data = useData();
  const setData = useSetData();
  const setRefAreaLeft = useSetRefAreaLeft();
  const setRefAreaRight = useSetRefAreaRight();
  const setLeft = useSetLeft();
  const setRight = useSetRight();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const theme = useTheme();

  useFetchData(
    validUrl,
    dataLocalStorageToggle,
    setDataLocalStorageToggle,
    data,
    setData
  );

  const zoomOut = () => {
    setRefAreaLeft("");
    setRefAreaRight("");
    setLeft("dataMin");
    setRight("dataMax");
  };

  const handleTooltip = (bool) => {
    setTooltipOpen(bool);
  };

  return (
    <div style={{ marginBottom: "4em" }}>
      <div className="flex">
        <DataRetention validUrl={validUrl} />
        <Typography
          variant="h4"
          style={{
            color: "#00C119",
            fontFamily: "Quicksand",
            fontWeight: "700",
          }}
        >
          {deviceId}
        </Typography>
        <div className="split">
          <ControlledTooltip
            title="Zoom Out"
            data-testid={`zoom-out-tooltip-${validUrl}`}
            open={tooltipOpen}
          >
            <FontAwesomeIcon
              data-testid={`zoom-out-${validUrl}`}
              style={{ color: theme.palette.text.primary }}
              icon={faMagnifyingGlassMinus}
              className="zoomOut"
              onMouseEnter={() => handleTooltip(true)}
              onMouseLeave={() => handleTooltip(false)}
              onClick={() => {
                handleTooltip(false);
                zoomOut();
              }}
            />
          </ControlledTooltip>

          <RefreshRate validUrl={validUrl} />
        </div>
      </div>
      <Chart validUrl={validUrl} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BromleySatSwitch validUrl={validUrl} />
        <ChartTimeWindow validUrl={validUrl} />
      </div>
    </div>
  );
};

export default ChartControl;
