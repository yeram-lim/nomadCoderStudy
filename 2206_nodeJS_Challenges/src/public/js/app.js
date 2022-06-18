const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");
const call = document.getElementById("call");

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = myStream.getVideoTracks()[0]; //가장 처음에 있는 카메라
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  const initialConstrains = {
    audio: true,
    video: { facingMode: "user" }, // 핸드폰으로 열 때 카메라가 셀카 모드
  };
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } }, //device 아이디를 함께 보내서 케메라를 재시작한다.
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstrains
    );
    myFace.srcObject = myStream;
    if (!deviceId) { //인자로 받은 device Id가 없을때만 카메라를 새로 실행한다.
      await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}

function handleMuteClick() {
  myStream
  .getAudioTracks()
  .forEach((track) => (track.enabled = !track.enabled));

  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}

function handleCameraClick() {
  myStream
  .getVideoTracks()
  .forEach((track) => (track.enabled = !track.enabled));

  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

async function handleCameraChange() {
  await getMedia(camerasSelect.value);
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);

// Welcome Form (join a room)
const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");

// 방입장 form 숨김 & 화상 전화 장치 form 나타남
async function initCall() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
}

let roomName;
// 방을 만들고 입장 시켜주는 이벤트를 전송하는 함수
async function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
  await initCall(); // peer2가 방에 참가하기 전에 initCall을 실행시켜 myPeerConnection을 정의한다.
  socket.emit("join_room", input.value);
  roomName = input.value;
  input.value = "";
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// Socket Code
let myPeerConnection;
socket.on("welcome", async () => {
  // 3. peer1이 offer를 만들어서 이를 서버에 보낸다. 여기서 offer란 다른 유저가 해당 방에 들어올 수 있도록 초대장을 보내는 것과 같은 역할이다.
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  console.log("sent the offer");
  socket.emit("offer", offer, roomName);
});

socket.on("offer", async (offer) => {
  // 4. peer1이 offer를 보내면 peer2가 RemoteDescription을 설정한다.
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer", answer, roomName);
});

// 서버에서 answer를 받았을 때
socket.on("answer", (answer) => {
  myPeerConnection.setRemoteDescription(answer);
});

// RTC Code
function makeConnection() {
  // 1. 방에 접속한 양쪽 브라우저(유저)들의 연결 통로를 만든다.
  myPeerConnection = new RTCPeerConnection();
  // 2. 양쪽 브라우저들의 카메라, 오디오를 불러와 연결시켰ㅅ다. 
  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
}
