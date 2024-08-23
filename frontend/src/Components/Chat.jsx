import React, { useCallback, useEffect, useRef, useState } from "react";
import { sendMessage } from "../Api";
import logoBlueBg from "../assets/hummingbird-blue-bg.png";
import sendBtn from "../assets/send.svg";
import userProfile from "../assets/user-profile.png";
import "../Styles/Chat.css";

// Function to handle sending the message
const handleSendMessage = async (userInput, setMessages, setUserInput) => {
  if (!userInput) return;

  // Add the user's message to the chat immediately
  setMessages((prevMessages) => [
    ...prevMessages,
    { type: "user", text: userInput },
  ]);

  // Clear the input field
  setUserInput("");

  // Send the message to the backend and get the bot's response
  const botResponse = await sendMessage(userInput);

  // Add the bot's response to the chat
  setMessages((prevMessages) => [
    ...prevMessages,
    { type: "bot", text: botResponse },
  ]);
};

const Chat = React.memo(() => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Olá! Eu sou a Jul.ia, sua assistente virtual. Posso responder perguntas com base nas informações fornecidas, fornecer orientações e auxiliar com dúvidas dentro dos limites do meu conhecimento. Como posso ajudar você?",
    },
    {
      type: "bot",
      text: "Teste",
    },
    {
      type: "bot",
      text: "Teste",
    },
    {
      type: "bot",
      text: "Teste",
    },
    {
      type: "bot",
      text: "Teste",
    },
    {
      type: "bot",
      text: "Teste",
    },
    {
      type: "bot",
      text: "Teste",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  const msgEnd = useRef(null);

  const handleSend = useCallback(() => {
    handleSendMessage(userInput, setMessages, setUserInput);
  }, [userInput, setMessages, setUserInput]);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="main">
      <div className="chat">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.type === "bot" ? "bot" : ""}`}
          >
            <img
              className="messageImg"
              src={msg.type === "bot" ? logoBlueBg : userProfile}
              alt=""
            />
            <p className="txt">{msg.text}</p>
          </div>
        ))}
        <div ref={msgEnd}></div> {/* Elemento final para scroll */}
      </div>
      <div className="chatFooter">
        <div className="inp">
          <input
            type="text"
            placeholder="Mensagem para Jul.ia"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()} // Envia a mensagem ao pressionar Enter
          />
          <button
            className={`send ${userInput ? "active" : ""}`}
            onClick={handleSend}
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
});

export default Chat;
