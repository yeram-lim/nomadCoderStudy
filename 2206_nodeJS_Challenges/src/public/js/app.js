const socket = io(); //io는 백엔드와 자동적으로 연결해주는 함수이다. 이렇게만 쓰면 서버와 연결 완료

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, () => {
    console.log("server is done!");
  });
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);