import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function TopAppBar({ toggleDrawer }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleDrawer} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          "Fire App"
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopAppBar;