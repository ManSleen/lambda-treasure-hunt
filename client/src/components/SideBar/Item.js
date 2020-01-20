import React from "react";

const Item = ({ item }) => {
  return (
    <div className="item-container">
      <div>
        <p>{item && item}</p>
      </div>
      <div>
        <button>take</button>
        <button>examine</button>
      </div>
    </div>
  );
};

export default Item;
