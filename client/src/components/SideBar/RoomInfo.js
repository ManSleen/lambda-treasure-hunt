import React from "react";
import RoomItems from "./RoomItems";

const RoomInfo = () => {
  return (
    <div className="room-info-container">
      <div className="room-title">
        <h2>Room 302</h2>
      </div>
      <div className="room-description">
        <h3>A Misty Room</h3>
        <p>
          You are standing on grass and surrounded by a dense mist. You can
          barely make out the exits in any direction.
        </p>
      </div>
      <hr />
      <div className="stat-container">
        <div className="stat">Coordinates</div>
        <div>
          <span className="value">(63,54)</span>
        </div>
      </div>
      <div className="stat-container">
        <div className="stat">Terrain</div>
        <div>
          <span className="value">NORMAL</span>
        </div>
      </div>
      <div className="stat-container">
        <div className="stat">Elevation</div>
        <div>
          <span className="value">0</span>
        </div>
      </div>
      <hr />
      <RoomItems />
    </div>
  );
};

export default RoomInfo;
