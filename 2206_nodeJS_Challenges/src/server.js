import http from "http";
// import WebSocket, {WebSocketServer}  from "ws";
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

// const handleListen = () => console.log(`Listening on http://localhost:3000`);

// const server = http.createServer(app); //http 서버를 만든다. 이렇게 해야 서버에 접근 가능
// const wss = new WebSocketServer({ server }); 
// 웹소켓 서버를 만들고 http 서버와 함께 둘 다 작동시킨다., 웹소켓 서버만 구동시기고 싶으면 {server}인자를 안 넘겨주면 된다   

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => { // 프론트와 연결한다. 소켓을 받는다.
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome");
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => socket.to(room).emit("bye"));
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", msg);
    done();
  });
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);

// const sockets = [];

// function onSocketClose() {
//     console.log("Disconnected from the Browser ❌");
// }

// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "Anon"; //소켓에 정보를 저장할 수 있다.
//     console.log("Connected to Browser ✅");

//     socket.on("close", onSocketClose);

//     socket.on("message", (msg) => {
//       const message = JSON.parse(msg);
//       console.log(message)
//       switch (message.type) {
//         case "new_message":
//           sockets.forEach((aSocket) =>
//             aSocket.send(`${socket.nickname}: ${message.payload}`)
//           );
//           break;
//         case "nickname":
//           socket["nickname"] = message.payload;
//           break;
//       }
//     });
//   });

// server.listen(3000, handleListen);
