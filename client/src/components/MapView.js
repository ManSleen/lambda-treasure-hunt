import React from "react";
import ReactTooltip from "react-tooltip";

import map from "../map/map.json";
import "./MapView.scss";

const MapView = ({ room }) => {
  const generateMap = graph => {
    const rooms = [];

    for (const vertex in graph) {
      const currentRoom = graph[vertex];
      const str = currentRoom.coordinates;
      const x = str.split(",")[0].slice(1);
      const y = str.split(",")[1].slice(0, -1);

      const roomToolTip = `
        <h2>${currentRoom.title}</h2>
        <p>${currentRoom.description}</p>
        ${currentRoom.room_id === room.room_id && `<h3>YOU ARE HERE</h3>`}
        `;

      rooms.push(
        <div
          className="map-child"
          style={{
            bottom: `${(y - 45) * 65}px`,
            left: `${(x - 45) * 65}px`
          }}
        >
          <div className="toprow">
            <div
              className="top-link"
              style={{
                backgroundColor: `${
                  currentRoom.exits["n"] >= 0 ? "#FFB68D" : 0
                }`
              }}
            >
              {" "}
            </div>
          </div>
          <div className="middlerow">
            <div
              className="left-link"
              style={{
                backgroundColor: `${
                  currentRoom.exits["w"] >= 0 ? "#FFB68D" : 0
                }`
              }}
            >
              {" "}
            </div>
            <div
              className="content"
              onClick={() => {}}
              data-tip={roomToolTip}
              data-html={true}
              style={{
                backgroundColor: `${
                  currentRoom.room_id === room.room_id
                    ? "green"
                    : currentRoom.title.includes("A misty room")
                    ? "coral"
                    : currentRoom.title.includes("Mt. Holloway")
                    ? "firebrick"
                    : currentRoom.title.includes("A Dark Cave")
                    ? "darkgrey"
                    : "#FFD233"
                }`,
                color: `${
                  currentRoom.room_id === room.room_id ? "white" : "black"
                }`
              }}
            >
              {currentRoom.room_id}
            </div>
            <div
              className="right-link"
              style={{
                backgroundColor: `${
                  currentRoom.exits["e"] >= 0 ? "#FFB68D" : 0
                }`
              }}
            >
              {" "}
            </div>
          </div>
          <div className="bottomrow">
            <div
              className="bottom-link"
              style={{
                backgroundColor: `${
                  currentRoom.exits["s"] >= 0 ? "#FFB68D" : 0
                }`
              }}
            >
              {" "}
            </div>
          </div>
        </div>
      );
    }
    return rooms;
  };
  console.log("room.room_id: ", room.room_id);

  return (
    <div className="map-view-container">
      {generateMap(map)}
      <ReactTooltip />
    </div>
  );
};

export default MapView;
