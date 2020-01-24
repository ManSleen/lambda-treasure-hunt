import React, { useState } from "react";
import "./BottomBar.scss";

import backpack from "../images/backpack.svg";
import pickaxe from "../images/pickaxe.svg";
import warp from "../images/warp.svg";
import dna from "../images/dna.svg";
import Item from "./SideBar/Item";

const BottomBar = ({ player }) => {
  const [clickedInventory, setClickedInventory] = useState(false);
  const [clickedAbilities, setClickedAbilities] = useState(false);

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
        <div className="inventory-container popup">
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
      <div
        onClick={() => {
          setClickedAbilities(!clickedAbilities);
        }}
        className="action-button"
      >
        <img src={dna} alt="" />
        Abilities
      </div>
      {clickedAbilities && (
        <div className="abilities-container popup">
          {player && player.abilities.length > 0
            ? player.abilities.map(ability => <h2>{ability}</h2>)
            : "You haven't gained any abilities yet"}
        </div>
      )}
    </div>
  );
};

export default BottomBar;
