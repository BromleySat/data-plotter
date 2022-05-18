import "./App.css";
import React, { useState, useEffect } from "react";
import { DataPlotter } from "./features/dataPlotter/dataPlotter";
import { useTheme } from "@material-ui/core/styles";
import { withTheme } from "./themes/Theme";
import { DarkThemeToggle } from "./features/darkTheme/darkThemeToggle";
import { Logo } from "./features/logo/Logo";
import Grid from "@mui/material/Grid";

function App() {
  const theme = useTheme();
  return (
    <Grid
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        margin: 0,
        alignItems: "center",
        justifyContent: "center",
        bgcolor: theme.palette.background.default,
        color: "text.primary",
        borderRadius: 0,
        p: 3,
      }}
    >
      <Logo />
      <DataPlotter />
      <DarkThemeToggle />
    </Grid>
  );
}

export default withTheme(App);
