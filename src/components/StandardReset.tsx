import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChessContext } from "../contexts/chessContext";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import "./reset.css";
import { TeamColour } from "../types/literals";

export default function StandardReset({ selectedColour }: { selectedColour: TeamColour }) {
  const { setResetTrigger, setUserTeamColour, gameboard } = useChessContext();

  function handleReset() {
    setUserTeamColour(selectedColour);
    setResetTrigger((prev) => !prev);
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
