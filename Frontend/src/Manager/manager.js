// SidePanel.js
import React from 'react';
import './manager.css';

const SidePanel = () => {
  return (
    <div className="sidePanel">
    <div className="content">
      {/* Your content goes here */}
      <h2>Side Panel</h2>
     
    </div>
    <div className="buttons">
        {/* Buttons with links on the right side */}
        <a href="/orders" className="button-link">
          Events Orders Details
        </a>
        <a href="/livestock" className="button-link">
          Livestock Data Details
        </a>
      </div>
  </div>
  );
};

export default SidePanel;
