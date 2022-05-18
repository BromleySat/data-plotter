import React from "react";
import logoLight from "./logo-light.png";
import logoDark from "./logo-dark.png";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useTheme } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";

export const Logo = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        width: "30%",
        position: "absolute",
        top: 6,
        left: 2,
        borderRadius: 0,
      }}
    >
      <ButtonBase href="https://bromleysat.com/">
        <CardMedia
          component="img"
          image={theme.palette.mode === "dark" ? logoDark : logoLight}
          alt="BromleySat Home"
          sx={{
            bgcolor: theme.palette.background.default,
          }}
        />
      </ButtonBase>
    </Card>
  );
};
