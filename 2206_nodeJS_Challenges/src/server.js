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

// ㅋㅋㅋㅋㅋ 요약: sids에는 개인방, rooms에는 개인방,공개방 다있음.
// rooms가 sids를 포함한다 보면됨.
// 그래서 공개방만 얻고 싶을때는 rooms에서 sids를 빼면 됨
function publicRooms() {
  const { 
    sockets: { // sockets 안으로 들어가 
      adapter: { sids, rooms }, // apdapter를 가지고 sids와 rooms 정보를 가져온다.
    },
  } = wsServer;  // wsServer 안에서

  const publicRooms = []; // room들을 모아둔다.
  rooms.forEach((_, key) => { // adapter를 이용해 socket id를 찾아 private room을 찾는다.
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  console.log('######3333', publicRooms)

  return publicRooms;
}

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size; // size: 방의 인원수를 센다.
}

wsServer.on("connection", (socket) => { // 프론트와 연결한다. 소켓을 받는다.
  socket["nickname"] = "Anon";

  socket.onAny((event) => {
    // console.log(wsServer.sockets.adapter);
    console.log(`Socket Event: ${event}`);
  });

  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));  // 하나의 소켓에만 메시지를 보냄
    wsServer.sockets.emit("room_change", publicRooms());  // 모든 소켓에 메시지를 보냄
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1)
    );
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });

  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
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
