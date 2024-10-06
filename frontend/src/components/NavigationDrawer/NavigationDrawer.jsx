import React from "react";
import { Drawer, List, ListItem, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import "./NavigationDrawer.css";

function NavigationDrawer({ isOpen, toggleDrawer, locations, onLocationSelect }) {
  const navigate = useNavigate();

  const handleLocationClick = (location) => {
    onLocationSelect(location);
    const locationUrl =
      location.name === "My Location" ? "/" : `/location/${location.name.replace(/\s+/g, "").toLowerCase()}`;
    navigate(locationUrl);
    toggleDrawer();
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
      <div style={{ width: "250px" }}>
        <div className="drawer-header">
          <IconButton className="close-icon" onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
          <Typography className="title">Weather Section</Typography>
        </div>
        <List>
          <Typography
            variant="h6"
            className="locations-title"
            sx={{ fontFamily: "Your Font Family", fontSize: "16px" }}
          >
            Locations
          </Typography>
          {locations.map((location, index) => (
            <ListItem
              button 
              key={index}
              className="location-item"
              onClick={() => handleLocationClick(location)}
            >
              {location.name}
            </ListItem>
          ))}
          <ListItem button className="location-item">
            Add New Location +
          </ListItem>
          <Typography
            variant="h6"
            className="settings-title"
            sx={{ fontFamily: "Your Font Family", fontSize: "16px", marginTop: "20px" }}
          >
            Settings
          </Typography>
          <ListItem button className="location-item">
            Profile
          </ListItem>
          <ListItem button className="location-item">
            Alerts
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

export default NavigationDrawer;