import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChessContext } from "../contexts/chessContext";
import "./reset.css";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

interface AdvancedResetProps {
  fenInputRef: React.RefObject<HTMLTextAreaElement>;
}
export default function AdvancedReset({ fenInputRef }: AdvancedResetProps) {
  const { gameboard } = useChessContext();

  function handleReset() {
    if (!fenInputRef.current) return;
    console.log(fenInputRef.current.value);
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
