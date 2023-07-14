import express from "express";
import { Server } from "socket.io";
import http from "http";
import { handler } from "./build/handler.js";
import {
  addUser,
  getUser,
  removeUser,
  getUsersInRoom,
  countUser,
} from "./users.js";
const port = 3000;
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  // cors: {
  //   origin: "http://localhost:5173",
  // },
});

io.on("connection", (socket) => {
  socket.on("setup", (config) => {
    let userCnt = countUser(config.room);
    if (userCnt >= 2) {
      io.to(socket.id).emit("connected", {
        status: false,
        message: "room is full",
      });
    } else {
      if (userCnt == 0) {
        addUser({
          id: socket.id,
          name: config.name,
          room: config.room,
          player: "X",
        });
        socket.join(config.room);
        io.to(config.room).emit("connected", {
          status: true,
          message: `${config.name} joined the room`,
          user: getUsersInRoom(config.room),
          id: socket.id,
        });
        io.to(socket.id).emit("player", "X");
      } else {
        addUser({
          id: socket.id,
          name: config.name,
          room: config.room,
          player: "O",
        });
        socket.join(config.room);
        io.to(config.room).emit("connected", {
          status: true,
          message: `${config.name} joined the room`,
          user: getUsersInRoom(config.room),
          id: socket.id,
        });
        io.to(socket.id).emit("player", "O");
      }
    }
  });

  socket.on("leaveGroup", (data) => {
    removeUser(data.id);
    io.to(data.room).emit("connected", {
      status: true,
      message: `${data.name} left the room`,
      user: getUsersInRoom(data.room),
      id: "",
    });
  });

  socket.on("chat message", (msg) => {
    io.to(msg.room).emit("chat message", msg.index);
  });

  socket.on("new game", (data) => {
    io.emit("new game", data);
  });
});
app.use(handler)

server.listen(port, () => {
  console.log(`running http://localhost:${port}`);
});
