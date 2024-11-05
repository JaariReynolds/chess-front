import { PieceName } from "../types/literals";

export default function getPromotionPieceName(actionAlgebraicNotation: string): PieceName | null {
  const equalsIndex = actionAlgebraicNotation.indexOf("=");

  if (equalsIndex == -1) return null;

  const promotionLetter = actionAlgebraicNotation[equalsIndex + 1];

  switch (promotionLetter) {
    case "R":
      return "Rook";
    case "B":
      return "Bishop";
    case "N":
      return "Knight";
    case "Q":
      return "Queen";
    default:
      return null;
  }
}
