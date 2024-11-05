const moveAudio = new Audio("/src/sounds/move.wav");
const captureAudio = new Audio("/src/sounds/capture.wav");

export function playActionAudio(action: string) {
  if (action.includes("x")) {
    playCaptureAudio();
  }
  playMoveAudio();
}

export function playMoveAudio() {
  moveAudio.play();
}

export function playCaptureAudio() {
  captureAudio.play();
}
