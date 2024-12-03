import { MovedPiece } from "../components/Pieces";
import { Action } from "../types/gameboard";
import getPiecevalueFromName from "./getPieceValueFromName";
import getPromotionPieceName from "./getPromotionPieceName";
import isPawnPromoteAction from "./isPawnPromoteAction";

// convert Action object to MovedPiece object
export default function handleSingleMovedPiece(action: Action): MovedPiece[] {
  let movedPiece: MovedPiece = {
    piece: action.piece,
    newSquare: action.square,
  };

  // create new piece objects (new name, new pieceValue) for promotion actions
  if (isPawnPromoteAction(action)) {
    const newName = getPromotionPieceName(action.algebraicNotation)!;
    movedPiece = {
      ...movedPiece,
      piece: {
        ...movedPiece.piece,
        name: newName,
        hasMoved: true,
        pieceValue: getPiecevalueFromName(newName),
      },
    };
  }

  return [movedPiece];
}
