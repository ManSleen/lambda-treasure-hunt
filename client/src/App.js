import React from "react";
import "./App.css";

import TopBar from "./components/TopBar.js";
import SideBar from "./components/SideBar/SideBar.js";
import MapView from "./components/MapView.js";
import BottomBar from "./components/BottomBar.js";

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
