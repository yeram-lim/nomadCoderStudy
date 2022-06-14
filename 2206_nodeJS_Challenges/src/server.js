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
    socket["nickname"] = "Anon"; //소켓에 정보를 저장할 수 있다.
    console.log("Connected to Browser ✅");

    socket.on("close", onSocketClose);

    socket.on("message", (msg) => {
      const message = JSON.parse(msg);
      console.log(message)
      switch (message.type) {
        case "new_message":
          sockets.forEach((aSocket) =>
            aSocket.send(`${socket.nickname}: ${message.payload}`)
          );
          break;
        case "nickname":
          socket["nickname"] = message.payload;
          break;
      }
    });
  });

server.listen(3000, handleListen);
