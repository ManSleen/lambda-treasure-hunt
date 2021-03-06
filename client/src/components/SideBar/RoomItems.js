import React from "react";

import Item from "./Item.js";

const RoomItems = ({ room, takeItem, dropItem }) => {
  return (
    <div className="room-items-container">
      <h3>Room items</h3>
      {room ? (
        room.items.length > 0 ? (
          room.items.map(item => (
            <Item
              dropItem={dropItem}
              takeItem={takeItem}
              key={item}
              type="room_item"
              item={item}
            />
          ))
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
