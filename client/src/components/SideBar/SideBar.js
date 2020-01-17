import React from "react";
import "./SideBar.scss";

import PlayerInfo from "./PlayerInfo";
import Wearables from "./Wearables";
import RoomInfo from "./RoomInfo";

const SideBar = () => {
  return (
    <div className="sidebar">
      <PlayerInfo />
      <Wearables />
      <RoomInfo />
    </div>
  );
};

export default SideBar;
