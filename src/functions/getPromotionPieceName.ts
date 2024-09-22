import { ActionType, PieceName } from "../types/literals";

export default function getPromotionPieceName(actionType: ActionType): PieceName | null {
  switch (actionType) {
    case "PawnPromoteRook":
      return "Rook";
    case "PawnPromoteBishop":
      return "Bishop";
    case "PawnPromoteKnight":
      return "Knight";
    case "PawnPromoteQueen":
      return "Queen";
    default:
      return null;
  }
}
