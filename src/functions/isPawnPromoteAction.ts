import { Action } from "../types/gameboard";

export default function isPawnPromoteAction(action: Action | null): boolean {
  return action != null && action.algebraicNotation.includes("=");
}
