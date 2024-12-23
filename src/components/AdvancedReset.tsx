import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reset.css";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useChessContext } from "../contexts/chessContext";

export default function AdvancedReset() {
  const { fenString, setFenString, fetchFenBoard } = useChessContext();
  function handleReset() {
    setFenString((prev) => prev.trim());
    fetchFenBoard();
  }

  return (
    <button
      className="reset-container"
      title="load from FEN"
      disabled={fenString.length == 0}
      onClick={handleReset}
    >
      <FontAwesomeIcon icon={faUpload} size="3x" />
    </button>
  );
}
