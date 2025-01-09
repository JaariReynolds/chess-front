import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useChessContext } from "../contexts/chessContext";
import { useEffect, useState } from "react";
import "./advanced-reset.css";

export default function AdvancedReset() {
  const { fenString, gameboard, setFenString, fetchFenBoard } = useChessContext();
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
      className={`advanced-reset-container`}
      title="load from FEN"
      disabled={fenString.length == 0}
      onClick={handleReset}
    >
      <div className={`button-container ${gameboard.isGameOver ? "slow-bounce" : ""}`}>
        <FontAwesomeIcon className={`reset-icon`} icon={faUpload} fontSize="3rem" />
        <span>Load FEN</span>
      </div>
    </button>
  );
}
