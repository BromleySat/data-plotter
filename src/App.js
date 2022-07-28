import "./App.css";
import React from "react";
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
        width: "100%",
        padding: 0,
        margin: 0,
        bgcolor: theme.palette.background.default,
        color: "text.primary",
        borderRadius: 0,
      }}
    >
      <Logo />
      <DataPlotter />
      <DarkThemeToggle />
    </Grid>
  );
}

export default withTheme(App);
