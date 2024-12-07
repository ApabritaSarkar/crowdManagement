const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require("http");
const { Server } = require("socket.io");
const officerRoutes = require('./routes/officer');
const Message = require("./models/Message"); // Import the Message model

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

  // Save messages and broadcast them
  socket.on("send-message", async (data) => {
    if (!data.sender || !data.content) {
      console.error("Invalid message data:", data);
      return;
    }

    // Save message to database
    try {
      const message = new Message({ sender: data.sender, content: data.content });
      await message.save();
      console.log(`Message from ${data.sender}: ${data.content}`);

      // Broadcast message to room
      io.to("officer-chat-room").emit("message", data);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id} for user: ${username}`);
  });
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }); // Fetch messages in chronological order
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Error fetching messages" });
  }
});


// Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
