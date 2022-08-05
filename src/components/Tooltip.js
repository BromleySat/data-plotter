import React from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    color: "#fff",
    fontFamily: "Quicksand",
    fontWeight: "700",
    fontSize: ".8rem",
    backgroundColor: "#00C119",
    maxWidth: "150px",
  },
  arrow: {
    color: "#00C119",
  },
}));

export const ControlledTooltip = (props) => {
  const classes = useStyles();

  return (
    <Tooltip
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
