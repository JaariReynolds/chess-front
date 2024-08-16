import { useChessContext } from "../contexts/chessContext";
import "../components/gameboard.css";
import { Piece, Square } from "../types/gameboard";
import getActionsForPiece from "../functions/getActionsForPiece";
import { arePiecesEqual, areSquaresEqual } from "../functions/objectEquality";

export default function Gameboard() {
  const { gameboard, teamActions, setSelectedAction, pieceActions, setPieceActions } =
    useChessContext();

  function handleSquarePress(piece: Piece | null, square: Square) {
    const actionableSquare = pieceActions?.actions.find((action) =>
      areSquaresEqual(action.square, square)
    );

    // if clicking on a square thats been highlighted as an actionable square, perform the action
    if (actionableSquare) {
      setSelectedAction(actionableSquare);
      return;
    }
    // if clicking on a square thats not highlighted, highlight the actionable squares for that piece
    else {
      //if reclicking the selected square, de-select the piece
      if (pieceActions && arePiecesEqual(piece, pieceActions.piece)) {
        setPieceActions(null);
        return;
      }

      // highlight the actionable squares for the newly clicked piece
      const actions = getActionsForPiece(piece, teamActions);
      setPieceActions(actions);
    }
  }

  // NEED TO ADD SOME INTERFACE TO ALLOW SELECTION OF PAWN PROMOTION (currently defaults to knight)

  function getSquareOpacity(square: Square): number {
    if (pieceActions == null) return 1;

    const actionableSquare = pieceActions.actions.some((action) =>
      areSquaresEqual(action.square, square)
    );

    return actionableSquare ? 0.3 : 1;
  }

  return (
    <div className="chessboard">
      {gameboard.board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <button
            type="button"
            onClick={() => handleSquarePress(piece, { x: rowIndex, y: colIndex })}
            style={{ opacity: getSquareOpacity({ x: rowIndex, y: colIndex }) }}
            key={parseInt(rowIndex.toString() + colIndex.toString())}
            className="square"
          >
            <span
              style={{ color: piece ? (piece.teamColour == "White" ? "white" : "black") : "white" }}
            >
              {piece ? piece.name : ""}{" "}
            </span>
          </button>
        ))
      )}
    </div>
  );
}
