import React from "react";
import { Link } from "react-router-dom";
import "./BottomBar.scss";

import backpack from "../images/backpack.svg";
import pickaxe from "../images/pickaxe.svg";
import warp from "../images/warp.svg";
import dna from "../images/dna.svg";

const BottomBar = () => {
  return (
    <div className="bottom-bar-container">
      <div className="action-button">
        <Link>
          <img src={backpack} alt="" />
          Inventory
        </Link>
      </div>

      <div className="action-button">
        <Link>
          <img src={pickaxe} alt="" />
          Mine
        </Link>
      </div>
      <div className="action-button">
        <Link>
          <img src={warp} alt="" />
          Warp
        </Link>
      </div>
      <div className="action-button">
        <Link>
          <img src={dna} alt="" />
          Abilities
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
