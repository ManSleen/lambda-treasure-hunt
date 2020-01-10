const axiosWithAuth = require("../util/axiosWithAuth.js");

const visited = {};

let currentRoom;
let previousRoom;

const delay = seconds =>
  new Promise(resolver => setTimeout(() => resolver(), seconds * 1000));

const init = async () => {
  const res = await axiosWithAuth().get("adv/init/");
  const startingRoom = res.data;
  visited[startingRoom.room_id] = convertExitsIntoObject(startingRoom);
  currentRoom = startingRoom;
  return currentRoom;
};

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

const getUnexploredExits = room => {
  let unexplored = [];
  console.log("exits in unxplored++++++", room.exits);
  for (const exit in room.exits) {
    if (room.exits[exit] === "?") {
      unexplored.push(exit);
    }
  }
  return unexplored;
};

const move = async (directionString, room) => {
  await delay(room.cooldown);
  try {
    const direction = { direction: directionString };
    const res = await axiosWithAuth().post("adv/move/", direction);
    const newRoom = res.data;
    return newRoom;
  } catch (error) {
    console.log(error);
  }
};

const traverseMap = async () => {
  await init();
  // While loop only runs if 'visited' graph's rooms have any "?" exits
  // AND
  // 'visited' graph's length is less than 500
  while (
    checkIfBothTrue(
      !graphIsComplete(visited),
      Object.keys(visited).length < 500
    )
  ) {
    if (!visited[currentRoom.room_id]) {
      visited[currentRoom.room_id] = convertExitsIntoObject(currentRoom);
    }
    previousRoom = currentRoom;
    currentRoom = await move("n", currentRoom);
    console.log("currentRoom: ", currentRoom);
    console.log("previousRoom: ", previousRoom);
  }
  console.log("visited: ", visited);
};

traverseMap();
