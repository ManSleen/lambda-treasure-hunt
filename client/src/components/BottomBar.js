import React, { useState } from "react";
import "./BottomBar.scss";

import backpack from "../images/backpack.svg";
import pickaxe from "../images/pickaxe.svg";
import warp from "../images/warp.svg";
import dna from "../images/dna.svg";
import Item from "./SideBar/Item";

const BottomBar = ({ player }) => {
  const [clickedInventory, setClickedInventory] = useState(false);
  return (
    <div className="bottom-bar-container">
      <div
        onClick={() => {
          setClickedInventory(!clickedInventory);
        }}
        className="action-button"
      >
        <img src={backpack} alt="" />
        Inventory
      </div>
      {clickedInventory && (
        <div className="inventory-container">
          {player && player.inventory.length > 0
            ? player.inventory.map(item => <Item item={item}></Item>)
            : "No items in inventory"}
        </div>
      )}

      <div className="action-button">
        <img src={pickaxe} alt="" />
        Mine
      </div>
      <div className="action-button">
        <img src={warp} alt="" />
        Warp
      </div>
      <div className="action-button">
        <img src={dna} alt="" />
        Abilities
      </div>
    </div>
  );
};

export default BottomBar;
