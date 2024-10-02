import React, { useState, useEffect } from 'react';
import './StatusBar.css';

function StatusBar() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      setCurrentTime(formattedTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000); 

    return () => clearInterval(timer); 
  }, []);

  return (
    <div className="status-bar">
      <div className="time">{currentTime}</div>
    </div>
  );
}

export default StatusBar;