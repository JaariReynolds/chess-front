import { AvailablePieceActions, Square } from "../types/gameboard";
import { areSquaresEqual } from "./objectEquality";

export default function getCursorStyle(
  square: Square,
  availableTeamActions: AvailablePieceActions[],
  selectedPieceActions: AvailablePieceActions | null
) {
  const actionablePiece = availableTeamActions.some((teamAction) =>
    areSquaresEqual(teamAction.piece.square, square)
  );

  const actionableSquare =
    selectedPieceActions &&
    selectedPieceActions.actions.some((action) => areSquaresEqual(action.square, square));

  if (actionablePiece || actionableSquare) return "pointer";

  return "default";
}
