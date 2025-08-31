import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// Store online users: { userId: socketId }
const userSocketMap = {};

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // frontend URL
    methods: ["GET", "POST"],
  },
});

// Utility: Get socketId by userId
export function getRSocketId(userId) {
  return userSocketMap[userId];
}

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("Mapped user:", userId, "->", socket.id);
  }

  // Notify all clients about online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  })
});

export { app, server, io };