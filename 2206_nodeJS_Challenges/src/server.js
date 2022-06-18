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
  socket.on("join_room", (roomName, done) => { //socket을 방에 참여시킨다.
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome");
  });
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
