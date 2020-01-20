import React from "react";
import "./SideBar.scss";

import PlayerInfo from "./PlayerInfo";
import Wearables from "./Wearables";
import RoomInfo from "./RoomInfo";

const SideBar = ({ player, room }) => {
  return (
    <div className="sidebar">
      <PlayerInfo player={player} />
      <Wearables player={player} />
      <RoomInfo room={room} />
    </div>
  );
};

export default SideBar;
