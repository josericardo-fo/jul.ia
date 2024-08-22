import React from "react";
import addSymbol from "../assets/add.png";
import savedIcon from "../assets/bookmark.svg";
import homeIcon from "../assets/home.svg";
import logo from "../assets/hummingbird.png";
import msgIcon from "../assets/message.svg";
import rocketIcon from "../assets/rocket.svg";
import "../Styles/Sidebar.css";

// Move handler functions outside the component
const startNewChat = () => {
  console.log("Iniciar nova conversa"); // Implement the logic for starting a new chat here
};

const handleQueryClick = (query) => {
  console.log(`Consulta rápida: ${query}`); // Implement the logic for handling quick queries here
};

function Sidebar() {
  return (
    <div className="sideBar">
      <div className="upperSide">
        <div className="upperSideTop">
          <img src={logo} alt="Logo" className="logo" />
          <span className="brand">Jul.ia</span>
        </div>
        <button className="midBtn" onClick={startNewChat}>
          <img src={addSymbol} alt="Nova Conversa" className="addBtn" />
          Nova Conversa
        </button>
        <div className="upperSideBottom">
          <button
            className="query"
            onClick={() => handleQueryClick("Quero marcar uma consulta")}
          >
            <img src={msgIcon} alt="Query" className="" />
            Quero marcar uma consulta
          </button>
          <button
            className="query"
            onClick={() => handleQueryClick("O que são queimaduras?")}
          >
            <img src={msgIcon} alt="Query" className="" />O que são queimaduras?
          </button>
        </div>
      </div>
      <div className="lowerSide">
        <div className="listItems">
          <img src={homeIcon} alt="Início" className="listItemsImg" />
          Início
        </div>
        <div className="listItems">
          <img src={savedIcon} alt="Salvos" className="listItemsImg" />
          Salvos
        </div>
        <div className="listItems">
          <img src={rocketIcon} alt="Pro" className="listItemsImg" />
          Jul.ia Pro
        </div>
      </div>
      <div className="main"></div>
    </div>
  );
}

export default Sidebar;
