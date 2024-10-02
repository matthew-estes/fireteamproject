import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function TopAppBar({ toggleDrawer }) {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Lorem Ipsum</Typography>
        </Toolbar>
      </AppBar>
    );
  }
  
  export default TopAppBar;