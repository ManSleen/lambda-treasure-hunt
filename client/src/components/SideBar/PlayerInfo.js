import React from "react";

const PlayerInfo = () => {
  return (
    <div className="player-info-container">
      <div className="stat-container">
        <div className="stat">Strength</div>
        <div>
          <span className="value">20</span>
        </div>
      </div>
      <div className="stat-container">
        <div className="stat">Speed</div>
        <div>
          <span className="value">100</span>
        </div>
      </div>
      <div className="stat-container">
        <div className="stat">Encumbrance</div>
        <div>
          <span className="value">10</span>
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
