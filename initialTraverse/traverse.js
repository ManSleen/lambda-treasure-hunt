const map = require("./data/map.json");

const axiosWithAuth = require("../util/axiosWithAuth.js");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const visited = JSON.parse(localStorage.getItem("visited")) || {};

let currentRoom;
let previousRoom;

const delay = seconds =>
  new Promise(resolver => setTimeout(() => resolver(), seconds * 1000));

const init = async () => {
  const res = await axiosWithAuth().get("adv/init/");
  const startingRoom = res.data;
  if (!visited[startingRoom.room_id]) {
    visited[startingRoom.room_id] = convertExitsIntoObject(startingRoom);
  }
  currentRoom = startingRoom;
  return currentRoom;
};

// Returns false if there are any exits with "?"s in the map
const graphIsComplete = map => {
  let status = true;
  for (const room in map) {
    for (const exit in map[room].exits) {
      if (map[room].exits[exit] === "?") {
        status = false;
        break;
      }
    }
  }
  return status;
};

const checkIfBothTrue = (bool1, bool2) => {
  let status = false;
  if (bool1 === true && bool2 === true) {
    status = true;
  }
  return status;
};

const convertExitsIntoObject = room => {
  const roomObj = { ...room };
  const exitsObj = {};
  roomObj.exits.forEach(exit => {
    exitsObj[exit] = "?";
  });
  roomObj.exits = exitsObj;
  return roomObj;
};

// Get current room from map, find out what room is on other side of the exit
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

// Find the direction/exit connecting 2 rooms together
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

const getUnexploredExits = room => {
  let unexplored = [];
  for (const exit in room.exits) {
    if (room.exits[exit] === "?") {
      unexplored.push(exit);
    }
  }
  return unexplored;
};

const move = async (directionString, room, refMap) => {
  await delay(room.cooldown);
  let nextRoom = findNextRoom(room.room_id, refMap, directionString);

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
    //  If we haven't visited this room yet...
    if (!visited[newRoom.room_id]) {
      //  Add room to OUR graph with ?s for exits (100: { n: ?, s: ? } )
      visited[newRoom.room_id] = convertExitsIntoObject(newRoom);
    }
    const prev = visited[room.room_id];
    const current = visited[newRoom.room_id];
    current.cooldown = newRoom.cooldown;
    return [prev, current];
  } catch (error) {
    console.log(error);
  }
};

// Returns path to closest room with unexplored exits
const bfs = (startingRoom, visited) => {
  const q = [];
  q.unshift([startingRoom]);

  const visitedSet = new Set();

  while (q.length > 0) {
    let currentPath = q.pop();
    let lastVertex = currentPath[currentPath.length - 1];
    if (!visitedSet.has(lastVertex)) {
      if (Object.values(visited[lastVertex.room_id].exits).includes("?")) {
        // Convert path of rooms to directions that we can follow to get there
        let directionsPath = [];
        for (let i = 0; i < currentPath.length - 1; i++) {
          let currentRoom = currentPath[i];
          let nextRoom = currentPath[i + 1];
          directionsPath.push(
            findNextDirection(currentRoom.room_id, visited, nextRoom.room_id)
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

const traverseMap = async () => {
  const opposites = { n: "s", s: "n", e: "w", w: "e" };

  //  Start off in a room (ex: room # 100)
  await init();

  //  While 'visited' graph's length is less than 500 AND 'visited' has any rooms containing "?"s for exits...
  while (
    checkIfBothTrue(
      !graphIsComplete(visited),
      Object.keys(visited).length < 500
    )
  ) {
    //  If room has been visited AND has unexplored exits...
    if (
      visited[currentRoom.room_id] &&
      getUnexploredExits(visited[currentRoom.room_id]).length > 0
    ) {
      //  Pick an unexplored exit and move in that direction.
      const unexploredDirection = getUnexploredExits(
        visited[currentRoom.room_id]
      )[0];
      //  Set previousRoom to currentRoom, then move to a new room and set currentRoom to that
      [previousRoom, currentRoom] = await move(
        unexploredDirection,
        currentRoom,
        map
      );

      // Update exits for new room and previous room (ex: we move 'n' to room 76, so we can update our graph -> 100: { n: 76, s: ? }, 76: {s: 100, e: ?, n: ?})
      const updatedPreviousRoom = { ...previousRoom };
      updatedPreviousRoom.exits[unexploredDirection] = currentRoom.room_id;

      const updatedCurrentRoom = { ...currentRoom };
      updatedCurrentRoom.exits[opposites[unexploredDirection]] =
        previousRoom.room_id;
      visited[currentRoom.room_id] = updatedCurrentRoom;
      visited[previousRoom.room_id] = updatedPreviousRoom;
    }
    //  Else If room has been visited AND all exits have been explored...
    else if (
      visited[currentRoom.room_id] &&
      getUnexploredExits(visited[currentRoom.room_id]).length === 0
    ) {
      //  Do a bfs to find nearest room with unexplored exits and move to it
      let path = bfs(currentRoom, visited);
      let nextDirection = path[0];
      [previousRoom, currentRoom] = await move(nextDirection, currentRoom, map);
    }
    localStorage.setItem("visited", JSON.stringify(visited));
  }
};

traverseMap();
