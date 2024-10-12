import { Action } from "../types/gameboard";
import isCaptureActionType from "./isCaptureActionType";

const moveAudio = new Audio("/src/sounds/move.wav");
const captureAudio = new Audio("/src/sounds/capture.wav");

export function playActionAudio(action: Action) {
  if (isCaptureActionType(action)) {
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
