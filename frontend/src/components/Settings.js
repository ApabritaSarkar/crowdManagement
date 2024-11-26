import React from 'react';
import Sidebar from './Sidebar';
import '../styles/Body.css'

const Settings = () => {
  return (
    <div className="settings">
      <Sidebar />
      <div className="bodyof3-settings">
      <h1>This is settings page.</h1>
      </div>
    </div>
  );
};

export default Settings;
