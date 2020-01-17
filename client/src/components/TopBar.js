import React from "react";
import "./TopBar.scss";

import gold from "../images/gold.svg";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar-container">
        <div className="topbar-player-name">
          <h2>Player39784</h2>
        </div>
        <div className="topbar-title">
          <h1>LAMBDA TREASURE HUNT</h1>
        </div>
        <div className="topbar-gold">
          <span>400</span> <img src={gold} alt="" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
