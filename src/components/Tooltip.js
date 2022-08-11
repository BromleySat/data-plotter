import React from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

export const ControlledTooltip = (props) => {
  const themee = useTheme();
  const useStyles = makeStyles((theme) => ({
    tooltip: {
      color: themee.palette.secondary.light,
      fontFamily: "Quicksand",
      fontWeight: "700",
      fontSize: ".8rem",
      backgroundColor: themee.palette.secondary.main,
      maxWidth: "150px",
    },
    arrow: {
      color: themee.palette.secondary.main,
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
          <h3 style={{ margin: 0 }}>{props.title}</h3>
          <br />
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
