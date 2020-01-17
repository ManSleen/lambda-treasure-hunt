import React from "react";
import "./App.css";

import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import MapView from "./components/MapView";
import BottomBar from "./components/BottomBar";

function App() {
  return (
    <div className="App">
      <TopBar />
      <SideBar />
      <MapView />
      <BottomBar />
    </div>
  );
}

export default App;
