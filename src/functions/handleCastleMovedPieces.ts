import { MovedPiece } from "../components/Pieces";
import { Action, Piece, Square } from "../types/gameboard";

// simplifying the piece component means indexing for the castling pieces in an ugly (forceful) way
// - could be much more elegant, but also would then require more unnecessary gameboard.board.maps()
export default function handleCastleMovedPieces(
  board: (Piece | null)[][],
  action: Action
): MovedPiece[] {
  let rookPiece: Piece;
  let rookNewSquare: Square;

  let kingPiece: Piece;
  let kingNewSquare: Square;

  // using .startsWith() for the edgecases of a castle causing a check(+) or mate(#)

  // if white queenside castle
  if (action.algebraicNotation.startsWith("O-O-O") && action.piece.teamColour == "White") {
    rookPiece = board[7][0]!;
    rookNewSquare = { x: 7, y: 3 };
    kingPiece = board[7][4]!;
    kingNewSquare = { x: 7, y: 2 };
  }
  // if white kingside castle
  else if (action.algebraicNotation.startsWith("O-O") && action.piece.teamColour == "White") {
    rookPiece = board[7][7]!;
    rookNewSquare = { x: 7, y: 5 };
    kingPiece = board[7][4]!;
    kingNewSquare = { x: 7, y: 6 };
  }
  // if black queenside castle
  else if (action.algebraicNotation.startsWith("O-O-O") && action.piece.teamColour == "Black") {
    rookPiece = board[0][0]!;
    rookNewSquare = { x: 0, y: 3 };
    kingPiece = board[0][4]!;
    kingNewSquare = { x: 0, y: 2 };
  }
  // if black kingisde castle
  else if (action.algebraicNotation.startsWith("O-O") && action.piece.teamColour == "Black") {
    rookPiece = board[0][7]!;
    rookNewSquare = { x: 0, y: 5 };
    kingPiece = board[0][4]!;
    kingNewSquare = { x: 0, y: 6 };
  } else {
    throw new Error(`provided action was not a castle: ${action}`);
  }

  const rookMovedPiece = {
    piece: rookPiece,
    newSquare: rookNewSquare,
  } as MovedPiece;

  const kingMovedPiece = {
    piece: kingPiece,
    newSquare: kingNewSquare,
  } as MovedPiece;

  console.log(rookMovedPiece);

  return [rookMovedPiece, kingMovedPiece];
}
