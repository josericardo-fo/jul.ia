import React from "react";
import addSymbol from "../assets/add.png";
import savedIcon from "../assets/bookmark.svg";
import homeIcon from "../assets/home.svg";
import logo from "../assets/hummingbird.png";
import msgIcon from "../assets/message.svg";
import rocketIcon from "../assets/rocket.svg";
import "../Styles/Sidebar.css";

const startNewChat = () => {
  window.location.reload();
};

function Sidebar({ setUserInput }) {
  const handleQueryClick = (query) => {
    setUserInput(query);
  };

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
            onClick={() =>
              handleQueryClick("Como fazer os primeiros socorros?")
            }
          >
            <img src={msgIcon} alt="Query" className="" />
            Como fazer os primeiros socorros?
          </button>
          <button
            className="query"
            onClick={() => handleQueryClick("Como devo tratar uma queimadura?")}
          >
            <img src={msgIcon} alt="Query" className="" />
            Como devo tratar uma queimadura?
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
