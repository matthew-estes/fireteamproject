import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./TopAppBar.css";

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
        <Typography variant="h6" sx={{flexGrow: 1, fontFamily: "Merriweather, serif"}}>
          EmberWatch
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopAppBar;