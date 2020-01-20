import React from "react";
import { Link } from "react-router-dom";
import backpack from "../images/backpack.svg";
import pickaxe from "../images/pickaxe.svg";
import warp from "../images/warp.svg";

const BottomBar = () => {
  return (
    <div className="bottom-bar-container">
      <div className="action-button">
        <img src={backpack} alt="" />
        Inventory
      </div>
      <div className="action-button">
        <img src={pickaxe} alt="" />
        Mine
      </div>
      <div className="action-button">
        <img src={warp} alt="" />
        Warp
      </div>
    </div>
  );
};

export default BottomBar;
