import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChessContext } from "../contexts/chessContext";
import "./reset.css";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function AdvancedReset() {
  const { fenInput, gameboard } = useChessContext();

  function handleReset() {
    console.log(fenInput);
  }

  return (
    <button
      className={gameboard.isGameOver ? "reset-container game-over" : "reset-container"}
      title="load from FEN"
      onClick={handleReset}
    >
      <FontAwesomeIcon icon={faUpload} size="3x" />
    </button>
  );
}
