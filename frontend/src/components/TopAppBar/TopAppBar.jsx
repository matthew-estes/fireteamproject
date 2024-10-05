import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import "./TopAppBar.css";

function TopAppBar({ toggleDrawer, onSearchClick }) { 
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "none",
      }}
    >
     <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}> 
        <IconButton edge="start" color="inherit" onClick={toggleDrawer} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            flex: 1,
            textAlign: 'center',
            fontFamily: "Merriweather, serif"
          }}
        >
          Weather Section
        </Typography>
        <IconButton
          edge="end" 
          color="inherit"
          onClick={onSearchClick}
        >
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default TopAppBar;