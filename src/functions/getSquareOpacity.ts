import { AvailablePieceActions, Square } from "../types/gameboard";
import { areSquaresEqual } from "./objectEquality";

export default function getSquareOpacity(
  square: Square,
  pieceActions: AvailablePieceActions | null
): number {
  if (pieceActions == null) return 1;

  const actionableSquare = pieceActions.actions.some((action) =>
    areSquaresEqual(action.square, square)
  );

  return actionableSquare ? 0.3 : 1;
}
