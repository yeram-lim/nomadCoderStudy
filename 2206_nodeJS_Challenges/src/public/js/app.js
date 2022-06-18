const socket = io(); //io는 백엔드와 자동적으로 연결해주는 함수이다. 이렇게만 쓰면 서버와 연결 완료

const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");
const room = document.getElementById("room");
const user = document.getElementById("user");

room.hidden = true;
user.hidden = true;

let roomName;
let nickName;

welcomeForm.addEventListener("submit", handleRoomSubmit);

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");

  roomName = input.value;
  socket.emit("enter_room", input.value, showRoom);
  input.value = "";
}

function showRoom() {
  // 방 메시지 보내는 창 나오게 함
  welcome.hidden = true;
  room.hidden = false;
  user.hidden = false;

  const roomNameBox = document.querySelector("#roomName");
  roomNameBox.innerText = `Room ${roomName}`;

  const msgForm = room.querySelector("#msg");
  const nameForm = user.querySelector("#name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNicknameSubmit);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

socket.on("new_message", addMessage);
//(msg) => {addMessage(msg)} 와 같음

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = user.querySelector("#name input");

  socket.emit("nickname", input.value, showRoom);
  nickName = input.value;
  input.value = "";
}

function addMessage(message) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}


socket.on("welcome", (user, newCount) => {
  const h3 = document.querySelector("h3#roomName");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} arrived!`);
});

socket.on("bye", (left, newCount) => {
  addMessage(`${left} left ㅠㅠ`);
});


socket.on("room_change", (rooms) => {
  const roomList = document.querySelector("ul");
  roomList.innerHTML = '';
  if(rooms.length === 0) {
    roomList.innerHTML = '';
    return;
  }
  rooms.forEach(room => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});

