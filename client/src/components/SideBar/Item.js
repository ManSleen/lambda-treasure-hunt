import React from "react";

const Item = ({ item, type, takeItem, room, sellItem }) => {
  return (
    <div className="item-container">
      <div>
        <p>{item && item}</p>
      </div>
      <div>
        {type === "room_item" ? (
          <button onClick={() => takeItem(item)}>take</button>
        ) : (
          <button>drop</button>
        )}
        {type === "inventory_item" && room.room_id === 1 ? (
          <button
            onClick={() => {
              sellItem(item);
            }}
          >
            sell
          </button>
        ) : (
          <button>examine</button>
        )}
      </div>
    </div>
  );
};

export default Item;
