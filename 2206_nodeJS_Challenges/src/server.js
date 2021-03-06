import http from "http";
import { Server } from "socket.io";
import express from "express";
import path from 'path';

const __dirname = path.resolve();

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => { 
  // 방에 입장했을 때
  socket.on("join_room", (roomName) => { //socket을 방에 참여시킨다.
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });

  // offer를 주고 받으며 브라우저간 연결 통로를 만들 때
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });

  // peer2가 offer를 받고 나서 answer를 보낼 때 
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });

  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
