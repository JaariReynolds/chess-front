import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChessContext } from "../contexts/chessContext";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

export default function Reset() {
  const { setResetTrigger } = useChessContext();

  return (
    <div>
      <button title="reset" onClick={() => setResetTrigger((prev) => !prev)}>
        <FontAwesomeIcon icon={faRotateRight} />
      </button>
    </div>
  );
}
