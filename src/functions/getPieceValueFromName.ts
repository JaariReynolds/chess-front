import { PieceName } from "../types/literals";

export default function getPiecevalueFromName(pieceName: PieceName): number {
  switch (pieceName) {
    case "Pawn":
      return 1;
    case "Bishop":
      return 3;
    case "Knight":
      return 3;
    case "Rook":
      return 5;
    case "Queen":
      return 9;
    case "King":
      return -1;
  }
}
