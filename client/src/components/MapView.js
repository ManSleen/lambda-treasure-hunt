import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { axiosWithAuth } from "../util/axiosWithAuth.js";

import map from "../map/map.json";
import "./MapView.scss";

const MapView = ({ room, setRoomInfo, setLoading }) => {
  const [destination, setDestination] = useState();

  useEffect(() => {
    console.log("room.room_id: ", room.room_id);
    if (destination && destination.room_id !== room.room_id) {
      travelToRoom(destination);
    }
  }, [room]);

  const handleClick = (e, destinationRoom) => {
    e.preventDefault();
    setDestination(destinationRoom);
    console.log("destinationRoom: ", destinationRoom);
    travelToRoom(destinationRoom);
  };

  const travelToRoom = async destinationRoom => {
    setLoading(true);
    const delay = seconds =>
      new Promise(resolver => setTimeout(() => resolver(), seconds * 1000));

    const findNextRoom = (currentRoomId, map, direction) => {
      let nextRoom;
      if (map[currentRoomId]) {
        for (const exit in map[currentRoomId].exits) {
          if (exit === direction) {
            nextRoom = map[currentRoomId].exits[exit];
            break;
          }
        }
      }
      return nextRoom;
    };

    const findNextDirection = (currentRoomId, map, nextRoomId) => {
      let nextDirection;
      for (const exit in map[currentRoomId].exits) {
        if (map[currentRoomId].exits[exit] === nextRoomId) {
          nextDirection = exit;
          break;
        }
      }
      return nextDirection;
    };

    const findShortestPathToRoom = (startingRoom, visited, destinationRoom) => {
      const q = [];
      q.unshift([startingRoom]);

      const visitedSet = new Set();

      while (q.length > 0) {
        let currentPath = q.pop();
        let lastVertex = currentPath[currentPath.length - 1];
        if (!visitedSet.has(lastVertex)) {
          if (lastVertex.room_id === destinationRoom.room_id) {
            // Convert path of rooms to directions that we can follow to get there
            let directionsPath = [];
            for (let i = 0; i < currentPath.length - 1; i++) {
              let currentRoom = currentPath[i];
              let nextRoom = currentPath[i + 1];
              directionsPath.push(
                findNextDirection(
                  currentRoom.room_id,
                  visited,
                  nextRoom.room_id
                )
              );
            }
            return directionsPath;
          }
          visitedSet.add(lastVertex);
          for (const neighbor in visited[lastVertex.room_id].exits) {
            const newPath = [
              ...currentPath,
              visited[visited[lastVertex.room_id].exits[neighbor]]
            ];
            q.unshift(newPath);
          }
        }
      }
    };

    const move = async (directionString, currentRoom, refMap) => {
      await delay(currentRoom.cooldown);
      let nextRoom = findNextRoom(currentRoom.room_id, refMap, directionString);
      let dirObj;

      if (nextRoom) {
        dirObj = {
          direction: directionString,
          next_room_id: `${nextRoom}`
        };
      } else {
        dirObj = {
          direction: directionString
        };
      }

      try {
        const res = await axiosWithAuth().post("adv/move/", dirObj);
        const newRoom = res.data;
        return newRoom;
      } catch (error) {
        console.log(error);
      }
    };

    console.log("destinationRoom.room_id: ", destinationRoom.room_id);

    let path = findShortestPathToRoom(room, map, destinationRoom);
    let nextDirection = path[0];
    const newRoom = await move(nextDirection, room, map);
    setRoomInfo(newRoom);
    setLoading(false);
  };

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
        ${currentRoom.room_id === room.room_id ? `<h3>YOU ARE HERE</h3>` : ``}
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
              onClick={e => {
                handleClick(e, currentRoom);
              }}
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

  return (
    <div className="map-view-container">
      {generateMap(map)}
      <ReactTooltip />
    </div>
  );
};

export default MapView;
