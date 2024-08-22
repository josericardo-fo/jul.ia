const API_URL = "http://127.0.0.1:5000/chat";

export async function sendMessage(message, sessionId = "default_session") {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, session_id: sessionId }),
  });
  const data = await response.json();
  return data.response;
}
