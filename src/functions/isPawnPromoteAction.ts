import { Action } from "../types/gameboard";

export default function isPawnPromoteAction(action: Action | null): boolean {
  console.log(action);
  return action != null && action.algebraicNotation.includes("=");
}
