const axiosWithAuth = require("../util/axiosWithAuth.js");

const visited = {};

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
    //  If we haven't visited this room yet...
    if (!visited[newRoom.room_id]) {
      //  Add room to OUR graph with ?s for exits (100: { n: ?, s: ? } )
      visited[newRoom.room_id] = convertExitsIntoObject(newRoom);
    }

    return visited[newRoom.room_id];
  } catch (error) {
    console.log(error);
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
      //  Set previousRoom to currentRoom
      previousRoom = visited[currentRoom.room_id];
      //  Then move to a new room and set currentRoom to it
      currentRoom = await move(unexploredDirection, currentRoom);

      // Update exits for new room and previous room (ex: we move 'n' to room 76, so we can update our graph -> 100: { n: 76, s: ? }, 76: {s: 100, e: ?, n: ?})
      const updatedPreviousRoom = { ...previousRoom };
      updatedPreviousRoom.exits[unexploredDirection] = currentRoom.room_id;

      const updatedCurrentRoom = { ...currentRoom };
      updatedCurrentRoom.exits[opposites[unexploredDirection]] =
        previousRoom.room_id;
      console.log("current room: ", currentRoom);
      console.log("previous room: ", previousRoom);
      visited[currentRoom.room_id] = updatedCurrentRoom;
      visited[previousRoom.room_id] = updatedPreviousRoom;
    }
    //  Else If room has been visited AND all exits have been explored...
    else if (
      visited[currentRoom.room_id] &&
      getUnexploredExits(visited[currentRoom.room_id]).length === 0
    ) {
      //  Do a bfs to find nearest room with unexplored exits and move to it
    }

    console.log("visited: ", visited);
  }
};

traverseMap();
