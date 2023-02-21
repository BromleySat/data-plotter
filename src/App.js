import "./App.css";
import React from "react";
import { DataPlotter } from "./components/DataPlotter/DataPlotter";
import { useTheme } from "@material-ui/core/styles";
import { withTheme } from "./themes/Theme";
import { DarkThemeToggle } from "./components/DarkTheme/DarkThemeToggle";
import { Logo } from "./components/Logo/Logo";
import Grid from "@mui/material/Grid";
import GlobalStyles from "@mui/material/GlobalStyles";

function App() {
  const theme = useTheme();
  return (
    <div>
      <GlobalStyles
        styles={{
          body: { backgroundColor: theme.palette.background.default },
        }}
      />
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
    </div>
  );
}

export default withTheme(App);
