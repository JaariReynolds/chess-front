import { AvailablePieceActions, Piece } from "../types/gameboard";
import { arePiecesEqual } from "./objectEquality";

export default function getActionsForPiece(
  piece: Piece | null,
  teamActions: AvailablePieceActions[]
): AvailablePieceActions | null {
  if (piece == null) return null;

  const pieceActions = teamActions.find((pieceActions) =>
    arePiecesEqual(pieceActions.piece, piece)
  );

  return pieceActions ?? null;
}
