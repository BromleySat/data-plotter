import React from "react";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectIsDark } from "../redux/darkTheme/darkThemeSlice";

const bromleySatDark = createTheme({
  palette: {
    type: "dark",
    mode: "dark",
    secondary: {
      main: "#00C119",
      light: "#fff",
    },
  },
});

const bromleySatLight = createTheme({
  palette: {
    type: "light",
    mode: "light",
    secondary: {
      main: "#00C119",
      light: "fff",
    },
  },
});

const Theme = (props) => {
  const darkThemeEnabled = useSelector(selectIsDark);
  const { children } = props;
  const defaultTheme = darkThemeEnabled ? bromleySatDark : bromleySatLight;
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export const withTheme = (Components) => {
  return (props) => {
    return (
      <Theme>
        <Components {...props} />
      </Theme>
    );
  };
};
