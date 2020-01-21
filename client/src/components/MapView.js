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
        style={{
          backgroundColor: "coral",
          width: "40px",
          height: "40px",
          top: `${(y - 45) * 60}px`,
          left: `${(x - 48) * 60}px`
        }}
        className="map-child"
      >
        {map[room].room_id}
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
