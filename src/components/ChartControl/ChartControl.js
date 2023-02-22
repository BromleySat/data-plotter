import React from "react";
import { useDispatch } from "react-redux";
import DataRetention from "../DataRetention/DataRetention";
import { RefreshRate } from "../RefreshRate/RefreshRate";
import { ChartTimeWindow } from "../ChartTimeWindow/ChartTimeWindow";
import { BromleySatSwitch } from "../Switch/Switch";
import { Typography } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import Chart from "../Chart/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons";
import "./ChartControl.css";
import ControlledTooltip from "../Tooltip/Tooltip";
import {
  setLeft,
  setRight,
  setRefAreaLeft,
  setRefAreaRight,
} from "../../redux/chart/chartSlice";

const ChartControl = ({ validUrl, deviceId }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const zoomOut = () => {
    // this.props.visibleData.slice();
    dispatch(setRefAreaLeft(""));
    dispatch(setRefAreaRight(""));
    dispatch(setLeft("dataMin"));
    dispatch(setRight("dataMax"));
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
          >
            <FontAwesomeIcon
              data-testid={`zoom-out-${validUrl}`}
              style={{ color: theme.palette.text.primary }}
              icon={faMagnifyingGlassMinus}
              className="zoomOut"
              onClick={zoomOut}
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