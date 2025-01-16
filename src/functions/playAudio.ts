import { Gameboard } from "../types/gameboard";

const moveAudio = new Audio("/src/sounds/move.wav");
const captureAudio = new Audio("/src/sounds/capture.wav");
const castleAudio = new Audio("/src/sounds/castle.wav");
const gameOverAudio = new Audio("/src/sounds/game-end.wav");
const promoteAudio = new Audio("/src/sounds/promote.wav");
const checkAudio = new Audio("/src/sounds/check.wav");

export function playAudio(gameboard: Gameboard) {
  if (gameboard.isGameOver) {
    gameOverAudio.play();
    return;
  }

  if (gameboard.checkTeamColour !== null) {
    checkAudio.play();
    return;
  }

  if (gameboard.lastPerformedAction == null) return;

  const action = gameboard.lastPerformedAction;
  switch (action.actionType) {
    case "Move":
    case "PawnDoubleMove":
      moveAudio.play();
      break;

    case "Capture":
    case "PawnEnPassant":
      captureAudio.play();
      break;

    case "KingsideCastle":
    case "QueensideCastle":
      castleAudio.play();
      break;

    // remaining actionTypes are all promote
    default:
      promoteAudio.play();
  }
}

export function playMoveAudio() {
  moveAudio.play();
}
