import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app); // 

const io = new Server(server, { // 
  cors: {
    origin: ["http://localhost:5173"]
  }
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId]; // Retrieve the socket id for the given userId
}
const userSocketMap = {}; // Store user sockets

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  const userId = socket.handshake.query.userId; // Assuming userId is sent as a query parameter
  if (userId) {
    userSocketMap[userId] = socket.id; // Map userId to socket id
    console.log(`User ${userId} connected with socket id ${socket.id}`);
  }

  io.emit('userConnected',Object.keys(userSocketMap)); // Notify all clients about the connected user


  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    delete userSocketMap[userId]; // Remove user from the map
    io.emit('userDisconnected', Object.keys(userSocketMap)); // Notify all clients about the disconnected user
  });
});

export { app, io, server }; // ✅ export correct name
