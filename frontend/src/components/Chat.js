import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const username = localStorage.getItem("username");
  const socketRef = useRef(null);

  useEffect(() => {
    if (!username) {
      console.error("Username is missing from localStorage!");
      return;
    }

    // Fetch message history
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/messages");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // Initialize socket connection
    socketRef.current = io("http://localhost:5000", { query: { username } });

    // Join chat room
    socketRef.current.emit("join-room", username);

    // Listen for new messages
    socketRef.current.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log(`${username} socket disconnected`);
      }
    };
  }, [username]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const messageData = { sender: username, content: newMessage };
    socketRef.current.emit("send-message", messageData);
    setNewMessage("");
  };

  return (
    <div>
      <h1>Officer Chat Room</h1>
      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", padding: "10px" }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
