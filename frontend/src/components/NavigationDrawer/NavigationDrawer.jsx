import React from 'react';
import { Drawer, List, ListItem, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function NavigationDrawer({ isDrawerOpen, toggleDrawer }) {
  return (
    <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
      <div style={{ width: 250, padding: 16 }}>
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
        <List>
          <Typography variant="subtitle1">Locations</Typography>
          <ListItem button>My Location</ListItem>
          <ListItem button>Label</ListItem>
          <ListItem button>Label</ListItem>
          <ListItem button>Label</ListItem>
          <Typography variant="subtitle1">Settings</Typography>
          <ListItem button>Label</ListItem>
          <ListItem button>Label</ListItem>
          <ListItem button>Label</ListItem>
        </List>
      </div>
    </Drawer>
  );
}

export default NavigationDrawer;