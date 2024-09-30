import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChessContext } from "../contexts/chessContext";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import "./reset.css";

export default function Reset() {
  const { setResetTrigger } = useChessContext();

  return (
    <button
      className="reset-container"
      title="reset"
      onClick={() => setResetTrigger((prev) => !prev)}
    >
      <FontAwesomeIcon icon={faRotateRight} className="reset-icon" size="3x" />
    </button>
  );
}
