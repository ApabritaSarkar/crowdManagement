const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require("http");
const { Server } = require("socket.io");
const officerRoutes = require('./routes/officer');

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', officerRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const ROOM_NAME = "officer-chat-room";

// Handle Socket.IO Connections
io.on("connection", (socket) => {
  const { username } = socket.handshake.query; // Extract username from query parameters
  console.log(`Socket connected: ${socket.id} for user: ${username}`);

  if (!username) {
    console.error("No username provided! Disconnecting socket.");
    socket.disconnect();
    return;
  }

  // Join the officer chat room
  socket.join("officer-chat-room");
  io.to("officer-chat-room").emit("message", {
    sender: "System",
    content: `${username} has joined the chat.`,
  });

  // Handle incoming messages
  socket.on("send-message", (data) => {
    if (!data.sender || !data.content) {
      console.error("Invalid message data:", data);
      return;
    }
    console.log(`Message from ${data.sender}: ${data.content}`);
    io.to("officer-chat-room").emit("message", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id} for user: ${username}`);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
