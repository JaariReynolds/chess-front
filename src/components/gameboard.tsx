import { useChessContext } from "../contexts/chessContext";
import "../components/gameboard.css";
import { Piece, Square } from "../types/gameboard";
import getActionsForPiece from "../functions/getActionsForPiece";
import { arePiecesEqual, areSquaresEqual } from "../functions/objectEquality";
import getSquareOpacity from "../functions/getSquareOpacity";
import isPawnPromoteAction from "../functions/isPawnPromoteAction";
import getCursorStyle from "../functions/getCursorStyle";

export default function Gameboard() {
  const {
    gameboard,
    teamActions,
    setSelectedAction,
    pieceActions,
    setPieceActions,
    setPromotionActionBase,
    setPromotionSelectionVisible,
  } = useChessContext();

  function handleSquarePress(piece: Piece | null, square: Square) {
    const actionableSquare = pieceActions?.actions.find((action) =>
      areSquaresEqual(action.square, square)
    );

    // if actionableSquare was a promote action, show component for user to select promotion
    if (actionableSquare && isPawnPromoteAction(actionableSquare)) {
      setPromotionActionBase(actionableSquare);
      setPromotionSelectionVisible(true);
      return;
    }

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

  const buttonStyle = (rowIndex: number, colIndex: number) => {
    const square = { x: rowIndex, y: colIndex };
    return {
      opacity: getSquareOpacity(square, pieceActions),
      cursor: getCursorStyle(square, teamActions, pieceActions),
    } as React.CSSProperties;
  };

  return (
    <div className="chessboard">
      {gameboard.board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <button
            type="button"
            onClick={() => handleSquarePress(piece, { x: rowIndex, y: colIndex })}
            style={buttonStyle(rowIndex, colIndex)}
            key={parseInt(rowIndex.toString() + colIndex.toString())}
            className="square"
          ></button>
        ))
      )}
    </div>
  );
}
