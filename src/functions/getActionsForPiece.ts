import { Action, AvailablePieceActions, Piece } from "../types/gameboard";
import { arePiecesEqual } from "./objectEquality";

export default function getActionsForPiece(
  piece: Piece | null,
  teamActions: AvailablePieceActions[]
): Action[] {
  if (piece == null) return [];

  const pieceActions = teamActions.find((pieceActions) =>
    arePiecesEqual(pieceActions.piece, piece)
  );

  if (pieceActions == undefined) return [];

  return pieceActions.actions;
}
