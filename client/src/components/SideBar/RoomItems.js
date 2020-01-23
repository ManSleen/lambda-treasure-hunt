import React from "react";

import Item from "./Item.js";

const RoomItems = ({ room }) => {
  return (
    <div className="room-items-container">
      <h3>Room items</h3>
      {room ? (
        room.items.length > 0 ? (
          room.items.map(item => <Item item={item} />)
        ) : (
          <p>There are no items in this room</p>
        )
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default RoomItems;
