import React from "react";
import PlayerInfo from "./PlayerInfo";
import Wearables from "./Wearables";
import RoomInfo from "./RoomInfo";

const SideBar = () => {
  return (
    <div>
      <PlayerInfo />
      <Wearables />
      <RoomInfo />
    </div>
  );
};

export default SideBar;
