import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChessContext } from "../contexts/chessContext";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import "./standard-reset.css";

export default function StandardReset() {
  const { fetchInitialBoard, gameboard } = useChessContext();

  function handleReset() {
    fetchInitialBoard();
  }

  return (
    <button className="standard-reset-container" title="reset" onClick={handleReset}>
      <FontAwesomeIcon
        icon={faRotateRight}
        className={`reset-icon ${gameboard.isGameOver ? "rotate-bounce" : ""}`}
        fontSize="3rem"
      />
    </button>
  );
}
