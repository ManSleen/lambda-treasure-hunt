import React from "react";
import "./SideBar.scss";

import PlayerInfo from "./PlayerInfo";
import Wearables from "./Wearables";
import RoomInfo from "./RoomInfo";

const SideBar = ({ player, room, takeItem, dropItem }) => {
  return (
    <div className="sidebar">
      <PlayerInfo player={player} />
      <Wearables player={player} />
      <RoomInfo dropItem={dropItem} takeItem={takeItem} room={room} />
    </div>
  );
};

export default SideBar;
