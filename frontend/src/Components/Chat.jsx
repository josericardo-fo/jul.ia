import React, { useCallback, useState } from "react";
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
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSend = useCallback(() => {
    handleSendMessage(userInput, setMessages, setUserInput);
  }, [userInput, setMessages, setUserInput]);

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
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
