export type TeamColour = "White" | "Black";
export type PieceName = "Pawn" | "Bishop" | "Knight" | "Rook" | "Queen" | "King";

export type ActionType =
  | "Move"
  | "Capture"
  | "PawnDoubleMove"
  | "PawnEnPassant"
  | "PawnPromoteKnight"
  | "PawnPromoteBishop"
  | "PawnPromoteRook"
  | "PawnPromoteQueen"
  | "KingsideCastle"
  | "QueensideCastle";
