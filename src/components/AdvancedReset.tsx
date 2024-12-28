import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reset.css";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useChessContext } from "../contexts/chessContext";
import { useEffect, useState } from "react";

export default function AdvancedReset() {
  const { fenString, setFenString, fetchFenBoard } = useChessContext();
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);

  function handleReset() {
    setFenString((prev) => prev.trim());
    setFetchTrigger((prev) => !prev);
  }

  useEffect(() => {
    if (fenString.length == 0) return;
    fetchFenBoard();
  }, [fetchTrigger]);

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
