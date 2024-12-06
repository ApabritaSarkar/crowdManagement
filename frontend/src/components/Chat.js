import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const username = localStorage.getItem("username"); // Fetch username from localStorage
  const socketRef = useRef(null); // Use useRef for socket instance

  useEffect(() => {
    if (!username) {
      console.error("Username is missing from localStorage!");
      return;
    }

    // Initialize socket only if it doesn't already exist
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000", {
        query: { username }, // Send username as query parameter
      });

      console.log(`${username} socket initialized`);

      // Join the chat room
      socketRef.current.emit("join-room", username);

      // Listen for incoming messages
      socketRef.current.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Handle disconnection
      socketRef.current.on("disconnect", () => {
        console.log(`${username} socket disconnected`);
      });
    }

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log(`${username} socket cleaned up`);
        socketRef.current = null;
      }
    };
  }, [username]); // Only reinitialize if username changes

  const sendMessage = () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages
    const messageData = {
      sender: username,
      content: newMessage,
    };
    socketRef.current.emit("send-message", messageData); // Use socket instance
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
