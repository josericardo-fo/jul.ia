import React, { useState } from "react";
import "./App.css";
import Chat from "./Components/Chat";
import Sidebar from "./Components/Sidebar";

function App() {
  const [userInput, setUserInput] = useState("");

  return (
    <div className="App">
      <div className="app-container">
        <Sidebar setUserInput={setUserInput} />
        <Chat userInput={userInput} setUserInput={setUserInput} />
      </div>
    </div>
  );
}

export default App;
