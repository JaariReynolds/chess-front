import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChessContext } from "../contexts/chessContext";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import "./reset.css";

export default function StandardReset() {
  const { fetchInitialBoard, gameboard } = useChessContext();

  function handleReset() {
    fetchInitialBoard();
  }

  return (
    <button
      className={gameboard.isGameOver ? "reset-container game-over" : "reset-container"}
      title="reset"
      onClick={handleReset}
    >
      <FontAwesomeIcon icon={faRotateRight} className="reset-icon" size="3x" />
    </button>
  );
}
