import React, { useState } from 'react';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");

    const sendMessage = async () => {
        if (!userInput) return;

        const newMessages = [...messages, { type: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput("");

        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userInput })
        }).then(res => res.json());

        setMessages([...newMessages, { type: 'bot', text: response.response }]);
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.type}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Enviar</button>
            </div>
        </div>
    );
}

export default Chat;
