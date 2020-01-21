import React from "react";
import map from "../map/map.json";
import "./MapView.scss";

const roomStyle = {
  backgroundColor: "coral",
  width: "50px",
  height: "50px"
};

const rooms = [];

const generateMap = graph => {
  for (const room in graph) {
    const str = graph[room].coordinates;
    const x = str.split(",")[0].slice(1);
    const y = str.split(",")[1].slice(0, -1);

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
              backgroundColor: `${graph[room].exits["n"] >= 0 ? "#FFB68D" : 0}`
            }}
          >
            {" "}
          </div>
        </div>
        <div className="middlerow">
          <div
            className="left-link"
            style={{
              backgroundColor: `${graph[room].exits["w"] >= 0 ? "#FFB68D" : 0}`
            }}
          >
            {" "}
          </div>
          <div
            className="content"
            style={{
              backgroundColor: `${
                graph[room].title.includes("A misty room")
                  ? "coral"
                  : graph[room].title.includes("Mt. Holloway")
                  ? "firebrick"
                  : graph[room].title.includes("A Dark Cave")
                  ? "darkgrey"
                  : "#FFD233"
              }`
            }}
          >
            {map[room].room_id}
          </div>
          <div
            className="right-link"
            style={{
              backgroundColor: `${graph[room].exits["e"] >= 0 ? "#FFB68D" : 0}`
            }}
          >
            {" "}
          </div>
        </div>
        <div className="bottomrow">
          <div
            className="bottom-link"
            style={{
              backgroundColor: `${graph[room].exits["s"] >= 0 ? "#FFB68D" : 0}`
            }}
          >
            {" "}
          </div>
        </div>
      </div>
    );
  }
};
generateMap(map);
console.log(rooms);
const MapView = () => {
  // console.log("map: ", map);
  return <div className="map-view-container">{rooms}</div>;
};

export default MapView;
