import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChessContext } from "../contexts/chessContext";
import "./reset.css";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function AdvancedReset() {
  const { fenInput, setFenInput, gameboard, setAdvancedResetTrigger } = useChessContext();

  function handleReset() {
    setFenInput((prev) => prev.trim());
    setAdvancedResetTrigger((prev) => !prev);
  }

  return (
    <button
      className={gameboard.isGameOver ? "reset-container game-over" : "reset-container"}
      title="load from FEN"
      disabled={fenInput.length == 0}
      onClick={handleReset}
    >
      <FontAwesomeIcon icon={faUpload} size="3x" />
    </button>
  );
}
