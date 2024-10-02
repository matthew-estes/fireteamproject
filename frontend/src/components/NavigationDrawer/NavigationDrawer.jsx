import React from 'react';
import { Drawer, List, ListItem, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

function NavigationDrawer({ isOpen, toggleDrawer }) {
  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
      <div style={{ width: '250px' }}>
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" style={{ paddingLeft: '16px' }}>
          Settings
        </Typography>
        <List>
          <ListItem>
            <Link to="/signin">Sign In</Link>
          </ListItem>
          <ListItem>
            <Link to="/signup">Sign Up</Link>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

export default NavigationDrawer;