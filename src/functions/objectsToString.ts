import { Action, Piece } from "../types/gameboard";
import squareToAlgebraicNotation from "./squareToAlgebraicNotation";

export function pieceToString(piece: Piece) {
  return `${piece.teamColour} ${piece.name} at ${squareToAlgebraicNotation(piece.square)}`;
}

export function actionToString(action: Action) {
  return `${pieceToString(action.piece)} - ${action.actionType} ${squareToAlgebraicNotation(
    action.square
  )}`;
}
