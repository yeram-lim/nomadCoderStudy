import http from "http";
import WebSocket, {WebSocketServer}  from "ws";
import express from "express";
import path from 'path';

const __dirname = path.resolve();

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app); //http 서버를 만든다. 이렇게 해야 서버에 접근 가능
const wss = new WebSocketServer({ server }); 
// 웹소켓 서버를 만들고 http 서버와 함께 둘 다 작동시킨다., 웹소켓 서버만 구동시기고 싶으면 {server}인자를 안 넘겨주면 된다   

const sockets = [];

function onSocketClose() {
    console.log("Disconnected from the Browser ❌");
}

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser ✅");

  socket.on("close", onSocketClose);

  socket.on("message", (message) => {
    sockets.forEach((aSocket) => aSocket.send(message.toString()));
    // 연결된 모든 소켓에 접근하기 위해 forEach를 사용한다. 크롬에게 받으면 크롬에게만 보내고 파이어 폭스에게 받으면 파이어폭스에게만 돌려보내는 것을 방지.
  });
});

server.listen(3000, handleListen);
