import React from "react";
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
          src={
            theme.palette.mode === "dark"
              ? "https://bromleysat.space/assets/images/logo-dark.png"
              : "https://bromleysat.space/assets/images/logo-light.png"
          }
          alt="BromleySat Home"
          sx={{
            bgcolor: theme.palette.background.default,
          }}
        />
      </ButtonBase>
    </Card>
  );
};
