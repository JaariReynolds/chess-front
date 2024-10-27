import { Piece } from "../types/gameboard";
import squareToAlgebraicNotation from "./squareToAlgebraicNotation";

export function pieceToString(piece: Piece) {
  return `${piece.name} ${squareToAlgebraicNotation(piece.square)}`;
}
