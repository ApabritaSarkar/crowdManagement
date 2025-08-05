// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const username = localStorage.getItem("username");
//   const socketRef = useRef(null);

//   useEffect(() => {
//     if (!username) {
//       console.error("Username is missing from localStorage!");
//       return;
//     }

//     // Fetch message history
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/messages");
//         const data = await response.json();
//         setMessages(data);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchMessages();

//     // Initialize socket connection
//     socketRef.current = io("http://localhost:5000", { query: { username } });

//     // Join chat room
//     socketRef.current.emit("join-room", username);

//     // Listen for new messages
//     socketRef.current.on("message", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         console.log(`${username} socket disconnected`);
//       }
//     };
//   }, [username]);

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;
//     const messageData = { sender: username, content: newMessage };
//     socketRef.current.emit("send-message", messageData);
//     setNewMessage("");
//   };

//   return (
//     <div>
//       <h1>Officer Chat Room</h1>
//       <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", padding: "10px" }}>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.sender}:</strong> {msg.content}
//           </p>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//         placeholder="Type your message..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-white bg-clip-text text-transparent mb-4">
            💬 Officer Chat Room
          </h1>
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-lg px-4 sm:px-6 py-3 rounded-full border border-white/20 inline-flex">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold text-sm sm:text-base">Connected as {username}</span>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center text-xl sm:text-2xl">
                  🚔
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg sm:text-xl">Secure Communications</h2>
                  <p className="text-blue-100 text-xs sm:text-sm">Real-time officer coordination</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-green-500/20 text-green-300 px-3 py-1 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                <span className="font-semibold text-xs sm:text-sm">Live</span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-80 sm:h-96 overflow-y-auto bg-black/20 p-4 sm:p-6 space-y-3 sm:space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-12 sm:mt-20">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl sm:text-3xl">💬</span>
                </div>
                <p className="text-base sm:text-lg">No messages yet</p>
                <p className="text-sm">Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === username ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-lg ${
                      msg.sender === username
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white ml-4'
                        : 'bg-white/20 backdrop-blur-sm text-white border border-white/20 mr-4'
                    }`}
                  >
                    <div className={`text-xs font-semibold mb-1 ${
                      msg.sender === username ? 'text-blue-100' : 'text-cyan-400'
                    }`}>
                      {msg.sender === username ? 'You' : msg.sender}
                    </div>
                    <p className="text-sm sm:text-base break-words">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 border-t border-white/10">
            <div className="">
              <div className="w-full relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  rows="3"
                  className="w-full bg-white/10 backdrop-blur-sm text-black placeholder-gray-400 px-4 sm:px-6 py-4 sm:py-5 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-base sm:text-lg resize-none"
                />
                <div className="absolute right-4 bottom-3 text-gray-400">
                  <span className="text-xs sm:text-sm">Press Enter ↵</span>
                </div>
              </div>
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold px-6 sm:px-8 py-4 sm:py-5 rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 text-sm sm:text-base h-fit"
              >
                <span className="hidden sm:inline">Send</span>
                <span className="sm:hidden">📤</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-gray-400 text-xs sm:text-sm">
            🔒 Secure encrypted communication • Real-time updates • Officer use only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;