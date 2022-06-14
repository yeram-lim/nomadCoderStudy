const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}`);//ws 서버로 접속한다.

function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("Connected to Server!")
}) //서버와 연결되면 발생한다. connection을 on 한다.


socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data);

    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
}); //메시지 이벤트, 메시지를 받으면 실행한다.
  
socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌");
}); //서버와 연결이 끊기면 발생한다.
  
function handleSubmit(event) { 
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value)); // 폼의 메시지를 서버로 보낸다.
    input.value = "";
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}
  
messageForm.addEventListener("submit", handleSubmit); //폼의 제출 버튼을 누르면?
nickForm.addEventListener("submit", handleNickSubmit);
  