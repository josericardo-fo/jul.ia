import React from "react";
import "./App.css";
import Chat from "./Components/Chat";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
