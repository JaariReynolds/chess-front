import { Action } from "../types/gameboard";

export default function isPawnPromoteAction(action: Action): boolean {
  return (
    action.actionType == "PawnPromoteBishop" ||
    action.actionType == "PawnPromoteKnight" ||
    action.actionType == "PawnPromoteQueen" ||
    action.actionType == "PawnPromoteRook"
  );
}
