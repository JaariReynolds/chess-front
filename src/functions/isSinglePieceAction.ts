import { Action } from "../types/gameboard";

// returns if an action moves only 1 piece (i.e. NOT a castle)
export default function isSinglePieceAction(action: Action): boolean {
  return !action.algebraicNotation.includes("O-");
}
