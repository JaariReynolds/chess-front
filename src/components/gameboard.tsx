import { useChessContext } from "../contexts/chessContext";
import "../components/gameboard.css";
import { Gameboard as GameboardInterface, Piece, Square } from "../types/gameboard";
import getActionsForPiece from "../functions/getActionsForPiece";
import { arePiecesEqual, areSquaresEqual } from "../functions/objectEquality";
import isPawnPromoteAction from "../functions/isPawnPromoteAction";
import getCursorStyle from "../functions/getCursorStyle";
import getTileColour from "../functions/getTileColour";
import { usePromotionContext } from "../contexts/promotionContext";

function isCheckedKing(piece: Piece, gameboard: GameboardInterface): boolean {
  if (piece == null || gameboard.checkTeamColour == null || gameboard.isGameOver) return false;

  return piece.teamColour && piece.teamColour == gameboard.checkTeamColour && piece.name == "King";
}

export default function Gameboard() {
  const {
    gameboard,
    teamActions,
    setSelectedAction,
    pieceActions,
    setPieceActions,
    userTeamColour,
  } = useChessContext();

  const { setPromotionActionBase, setPromotionSelectionVisible } = usePromotionContext();

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
    if (gameboard.currentTeamColour != userTeamColour) return;

    const square = { x: rowIndex, y: colIndex };
    const cursorStyle = getCursorStyle(square, teamActions, pieceActions);
    return {
      backgroundColor: getTileColour(square, pieceActions),
      cursor: cursorStyle,
    } as React.CSSProperties;
  };

  const buttonStyleClasses = (x: number, y: number, piece: Piece) => {
    return `${
      getCursorStyle({ x, y }, teamActions, pieceActions) == "pointer" &&
      gameboard.currentTeamColour == userTeamColour
        ? "clickable-tile"
        : ""
    } ${isCheckedKing(piece, gameboard) ? "checked" : ""}`;
  };

  return (
    <div
      className={`chessboard ${userTeamColour == "White" ? "" : "rotated"}`}
      style={{ pointerEvents: gameboard.currentTeamColour != userTeamColour ? "none" : "auto" }}
    >
      {gameboard.board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <button
            type="button"
            onClick={() => handleSquarePress(piece, { x: rowIndex, y: colIndex })}
            style={buttonStyle(rowIndex, colIndex)}
            key={parseInt(rowIndex.toString() + colIndex.toString())}
            className={`
              square ${buttonStyleClasses(rowIndex, colIndex, piece)}`}
          ></button>
        ))
      )}
    </div>
  );
}
