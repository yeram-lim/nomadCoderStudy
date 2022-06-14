const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`);//ws 서버로 접속한다.

socket.addEventListener("open", () => {
    console.log("Connected to Server!")
}) //서버와 연결되면 발생한다. connection을 on 한다.


socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data);
}); //메시지 이벤트, 메시지를 받으면 실행한다.
  
  socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌");
}); //서버와 연결이 끊기면 발생한다.
  
function handleSubmit(event) { 
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value); // 폼의 메시지를 서버로 보낸다.
    input.value = "";
}
  
messageForm.addEventListener("submit", handleSubmit); //폼의 제출 버튼을 누르면?

  