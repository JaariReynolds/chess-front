import { useChessContext } from "../contexts/chessContext";
import "../components/gameboard.css";

export default function Gameboard() {
  const { gameboard } = useChessContext();
  return (
    <div className="chessboard">
      {gameboard.board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <button
            type="button"
            onClick={() => console.log(piece ? piece.square : null)}
            key={parseInt(rowIndex.toString() + colIndex.toString())}
            className="square"
          >
            <span
              style={{ color: piece ? (piece.teamColour == "Black" ? "black" : "white") : "white" }}
            >
              {piece ? piece.name : ""}{" "}
            </span>
          </button>
        ))
      )}
    </div>
  );
}
