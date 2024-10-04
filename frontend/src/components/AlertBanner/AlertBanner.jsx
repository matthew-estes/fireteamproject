import React, { useState, useEffect } from 'react';
import './AlertBanner.css'; // Import the CSS for styling

const AlertBanner = ({ message, visible }) => {
  return (
    <div className={`alert-banner ${visible ? 'visible' : ''}`}>
      <p>{message}</p>
    </div>
  );
};

export default AlertBanner;
