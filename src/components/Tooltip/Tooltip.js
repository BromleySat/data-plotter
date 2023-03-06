import React from "react";
import "./Tooltip.css";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

export const ControlledTooltip = (props) => {
  const theme = useTheme();
  const useStyles = makeStyles((t) => ({
    tooltip: {
      color: theme.palette.secondary.light,
      fontFamily: "Quicksand",
      fontWeight: "700",
      fontSize: ".8rem",
      backgroundColor: theme.palette.secondary.main,
      maxWidth: "150px",
    },
    arrow: {
      color: theme.palette.secondary.main,
    },
    "@media (max-width: 40em)": {
      tooltip: {
        maxWidth: "120px",
      },
    },
  }));
  const classes = useStyles();

  return (
    <Tooltip
      data-testid={props.dataTestId}
      enterTouchDelay={0}
      leaveTouchDelay={5000}
      open={props.open}
      title={
        <React.Fragment>
          <h3 className="tooltipTitle">{props.title}</h3>
          {props.content}
        </React.Fragment>
      }
      arrow
      placement="top"
      classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
    >
      {props.children ? props.children : null}
    </Tooltip>
  );
};

export default ControlledTooltip;
