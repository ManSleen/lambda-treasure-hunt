import React from "react";

const Item = ({ item, type }) => {
  return (
    <div className="item-container">
      <div>
        <p>{item && item}</p>
      </div>
      <div>
        {type === "room_item" ? <button>take</button> : <button>drop</button>}
        <button>examine</button>
      </div>
    </div>
  );
};

export default Item;
