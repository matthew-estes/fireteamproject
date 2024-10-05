import React, { useState, useEffect } from "react";
import "./AlertBanner.css";
import FireAlertIcon from "../../assets/icons/fire-alert.svg";

const AlertBanner = ({ message, visible }) => {
  return (
    <div className={`alert-banner ${visible ? "visible" : ""}`}>
      <img src={FireAlertIcon} alt="Fire Alert" style={{ height: "24px", marginRight: "8px" }} />
      <p>{message}</p>
    </div>
  );
};

export default AlertBanner;
