import { useChessContext } from "../contexts/chessContext";
import "../components/gameboard.css";
import { Piece, Square } from "../types/gameboard";
import getActionsForPiece from "../functions/getActionsForPiece";
import { areSquaresEqual } from "../functions/objectEquality";

export default function Gameboard() {
  const { gameboard, teamActions, setSelectedAction, pieceActions, setPieceActions } =
    useChessContext();

  function handleSetPieceActions(piece: Piece | null, square: Square) {
    const actionSquare = pieceActions.find((action) => areSquaresEqual(action.square, square));
    if (actionSquare) {
      setSelectedAction(actionSquare);
      return;
    }

    const actions = getActionsForPiece(piece, teamActions);
    setPieceActions(actions);
    console.log(actions);
  }

  return (
    <div className="chessboard">
      {gameboard.board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <button
            type="button"
            onClick={() => handleSetPieceActions(piece, { x: rowIndex, y: colIndex })}
            style={{
              opacity: pieceActions.some((action) =>
                areSquaresEqual(action.square, { x: rowIndex, y: colIndex })
              )
                ? 0.3
                : 1,
            }}
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
