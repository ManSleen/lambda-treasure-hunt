import React from "react";

import upperBody from "../../images/upper-body.svg";
import lowerBody from "../../images/lower-body.svg";

const Wearables = () => {
  return (
    <div className="wearables-container">
      <div className="upper-body child">
        <div>
          <img src={upperBody} alt="" />
          <p>terrible jacket</p>
        </div>
      </div>
      <div className="lower-body child">
        <div>
          <img src={lowerBody} alt="" />
          <p>nice boots</p>
        </div>
      </div>
    </div>
  );
};

export default Wearables;
