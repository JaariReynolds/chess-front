import { Action } from "../types/gameboard";
import isPawnPromoteAction from "./isPawnPromoteAction";

export default function isCaptureActionType(action: Action): boolean {
  if (
    action.actionType == "Capture" ||
    action.actionType == "PawnEnPassant" ||
    (isPawnPromoteAction(action) && action.promoteCapturePoints > 0)
  )
    return true;
  return false;
}
