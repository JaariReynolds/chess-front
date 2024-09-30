import { AvailablePieceActions, Square } from "../types/gameboard";
import { areSquaresEqual } from "./objectEquality";

const lighterStandard = "rgba(230, 221, 176, 1)";
const lighterHighlighted = "rgba(230, 221, 176, 0.3)";
const darkerStandard = "rgba(171, 140, 93, 1)";
const darkerHighlighted = "rgba(171, 140, 93, 0.3)";

export default function getTileColour(
  square: Square,
  pieceActions: AvailablePieceActions | null
): string {
  const standardOpacity = (square.x + square.y) % 2 === 0 ? lighterStandard : darkerStandard;

  const hightlightedOpacity =
    (square.x + square.y) % 2 === 0 ? lighterHighlighted : darkerHighlighted;

  if (pieceActions == null) return standardOpacity;

  const actionableSquare = pieceActions.actions.some((action) =>
    areSquaresEqual(action.square, square)
  );

  return actionableSquare ? hightlightedOpacity : standardOpacity;
}
