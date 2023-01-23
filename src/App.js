import React from "react";
import { DataPlotter } from "./features/dataPlotter/dataPlotter";
import { useTheme } from "@material-ui/core/styles";
import { withTheme } from "./themes/Theme";
import { DarkThemeToggle } from "./features/darkTheme/darkThemeToggle";
import { Logo } from "./features/logo/Logo";
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
