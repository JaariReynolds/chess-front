const moveAudio = new Audio("/src/sounds/move.wav");
const captureAudio = new Audio("/src/sounds/capture.wav");
const castleAudio = new Audio("/src/sounds/castle.wav");

export function playActionAudio(action: string) {
  if (action.includes("x")) {
    playCaptureAudio();
  } else if (action.includes("O-")) {
    playCastleAudio();
  } else {
    playMoveAudio();
  }
}

export function playMoveAudio() {
  moveAudio.play();
}

export function playCaptureAudio() {
  captureAudio.play();
}

function playCastleAudio() {
  castleAudio.play();
}
