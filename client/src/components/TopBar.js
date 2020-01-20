import React from "react";
import "./TopBar.scss";

import gold from "../images/gold.svg";

const TopBar = ({ player }) => {
  return (
    <div className="topbar">
      <div className="topbar-container">
        <div className="topbar-player-name">
          <h2>{player ? player.name : "loading..."}</h2>
        </div>
        <div className="topbar-title">
          <h1>LAMBDA TREASURE HUNT</h1>
        </div>
        <div className="topbar-gold">
          {player ? (
            <>
              <span>{player.gold}</span> <img src={gold} alt="" />
            </>
          ) : (
            "loading..."
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
