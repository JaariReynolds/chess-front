import { Action, Piece } from "../types/gameboard";
import squareToAlgebraicNotation from "./squareToAlgebraicNotation";

export function pieceToString(piece: Piece) {
  return `${piece.name} ${squareToAlgebraicNotation(piece.square)}`;
}

export function actionToString(action: Action) {
  return `${pieceToString(action.piece)} - ${squareToAlgebraicNotation(action.square)}`;
}
