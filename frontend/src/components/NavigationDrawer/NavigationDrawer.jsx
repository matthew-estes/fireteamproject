import React from 'react';
import { Drawer, List, ListItem, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom'; 

function NavigationDrawer({ isOpen, toggleDrawer, locations, onLocationSelect }) {
  const navigate = useNavigate(); 

  const handleLocationClick = (location) => {
    onLocationSelect(location); 
    const locationUrl = location.name === 'My Location' ? '/' : `/location/${location.name.replace(/\s+/g, "").toLowerCase()}`;
    navigate(locationUrl); 
    toggleDrawer();
  };

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
          <Typography variant="h6" style={{ paddingLeft: '16px', marginTop: '20px' }}>
            Locations
          </Typography>
          {locations.map((location, index) => (
            <ListItem
              button={true}  
              key={index}
              onClick={() => handleLocationClick(location)} 
            >
              {location.name}
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

export default NavigationDrawer;