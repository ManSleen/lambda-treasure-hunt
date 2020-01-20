import React from "react";

const PlayerInfo = ({ player }) => {
  return (
    <div className="player-info-container">
      <div className="stat-container">
        <div className="stat">Strength</div>
        <div>
          <span className="value">
            {player ? player.strength : "loading..."}
          </span>
        </div>
      </div>
      <div className="stat-container">
        <div className="stat">Speed</div>
        <div>
          <span className="value">{player ? player.speed : "loading..."}</span>
        </div>
      </div>
      <div className="stat-container">
        <div className="stat">Encumbrance</div>
        <div>
          <span className="value">
            {player ? player.encumbrance : "loading..."}
          </span>
        </div>
      </div>
      <hr />
      <div className="stat-container">
        <div className="stat">Lambda Coins Mined</div>
        <div>
          <span className="value">102</span>
        </div>
      </div>
      <div className="stat-container">
        <div className="stat">Golden Snitches</div>
        <div>
          <span className="value">58</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
