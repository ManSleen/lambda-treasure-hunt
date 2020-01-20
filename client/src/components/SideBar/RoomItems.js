import React from "react";

import Item from "./Item.js";

const RoomItems = ({ room }) => {
  return (
    <div className="room-items-container">
      <h3>Room items</h3>
      {room && room.items.map(item => <Item item={item} />)}
    </div>
  );
};

export default RoomItems;
