import React from "react";
import RoomItems from "./RoomItems";

const RoomInfo = ({ room, takeItem }) => {
  return (
    <div className="room-info-container">
      <div className="room-title">
        <h2>{room ? `Room ${room.room_id}` : "loading..."}</h2>
      </div>
      <div className="room-description">
        <h3>{room ? room.title : "loading..."}</h3>
        <p>{room ? room.description : "loading..."}</p>
      </div>
      <hr />
      <div className="stat-container">
        <div className="stat">Coordinates</div>
        <div>
          <span className="value">
            {room ? room.coordinates : "loading..."}
          </span>
        </div>
      </div>
      <div className="stat-container">
        <div className="stat">Terrain</div>
        <div>
          <span className="value">{room ? room.terrain : "loading..."}</span>
        </div>
      </div>
      <div className="stat-container">
        <div className="stat">Elevation</div>
        <div>
          <span className="value">{room ? room.elevation : "loading..."}</span>
        </div>
      </div>
      <hr />
      <RoomItems takeItem={takeItem} room={room} />
    </div>
  );
};

export default RoomInfo;
