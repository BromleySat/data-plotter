import React from "react";
import { DataPlotter } from "./components/DataPlotter/DataPlotter";
import { useTheme } from "@material-ui/core/styles";
import { withTheme } from "./themes/Theme";
import { DarkThemeToggle } from "./components/DarkTheme/DarkThemeToggle";
import { Logo } from "./components/Logo/Logo";
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
      <Logo />
      <DataPlotter />
      <DarkThemeToggle />
    </div>
  );
}

export default withTheme(App);
