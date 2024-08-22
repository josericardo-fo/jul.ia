import React, { useState } from "react";
import { sendMessage } from "../Api";
import logoBlueBg from "../assets/hummingbird-blue-bg.png";
import sendBtn from "../assets/send.svg";
import userProfile from "../assets/user-profile.png";
import "../Styles/Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (!userInput) return;

    // Adiciona a mensagem do usuário ao estado
    setMessages([...messages, { type: "user", text: userInput }]);

    // Envia a mensagem para o backend e obtém a resposta
    const botResponse = await sendMessage(userInput);

    // Adiciona a resposta do bot ao estado
    setMessages([
      ...messages,
      { type: "user", text: userInput },
      { type: "bot", text: botResponse },
    ]);

    // Limpa o campo de entrada de texto
    setUserInput("");
  };

  return (
    <div className="main">
      <div className="chats">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${msg.type === "bot" ? "bot" : ""}`}
          >
            <img
              className="chatImg"
              src={msg.type === "bot" ? logoBlueBg : userProfile}
              alt=""
            />
            <p className="txt">{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chatFooter">
        <div className="inp">
          <input
            type="text"
            placeholder="Mensagem para Jul.ia"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className={`send ${userInput ? "active" : ""}`}
            onClick={handleSendMessage}
          >
            <img src={sendBtn} alt="Enviar" />
          </button>
        </div>
        <p>
          Jul.ia pode cometer erros. Considere verificar informações
          importantes.
        </p>
      </div>
    </div>
  );
}

export default Chat;
