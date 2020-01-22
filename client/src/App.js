import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "./util/axiosWithAuth";

import "./App.css";

import TopBar from "./components/TopBar.js";
import SideBar from "./components/SideBar/SideBar.js";
import MapView from "./components/MapView.js";
import BottomBar from "./components/BottomBar.js";

import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
  margin: 0 auto;
  background-color: none;
  position: absolute;
  top: 45%;
  left: 48%;
  color: #da5d17;
`;

function App() {
  const [roomInfo, setRoomInfo] = useState();
  const [playerInfo, setPlayerInfo] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const playerRes = await axiosWithAuth().post("adv/status/", {});
      const roomRes = await axiosWithAuth().get("adv/init/");
      const initRoom = roomRes.data;
      const initPlayer = playerRes.data;
      setRoomInfo(initRoom);
      setPlayerInfo(initPlayer);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    init();
  }, []);

  if (!loading) {
    console.log("roomInfo: ", roomInfo, "playerInfo: ", playerInfo);
  }

  return (
    <div className="App">
      {loading && (
        <div className="loader-container">
          <BounceLoader
            css={override}
            size={150}
            color={"#DA5D17"}
            loading={loading}
          />
        </div>
      )}
      {roomInfo && playerInfo ? (
        <>
          <TopBar player={playerInfo} />
          <div className="middle">
            <SideBar player={playerInfo} room={roomInfo} />
            <MapView room={roomInfo} />
          </div>
          <BottomBar />
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
}

export default App;
