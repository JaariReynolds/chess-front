import { Piece, Square } from "../types/gameboard";

export function arePiecesEqual(piece1: Piece | null, piece2: Piece | null): boolean {
  if (piece1 == null || piece2 == null) return false;

  return (
    piece1.name === piece2.name &&
    piece1.teamColour === piece2.teamColour &&
    piece1.pieceValue === piece2.pieceValue &&
    piece1.hasMoved === piece2.hasMoved &&
    areSquaresEqual(piece1.square, piece2.square)
  );
}

export function areSquaresEqual(square1: Square | null, square2: Square | null): boolean {
  if (square1 == null || square2 == null) return false;
  return square1.x == square2.x && square1.y == square2.y;
}
