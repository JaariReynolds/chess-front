import { useChessContext } from "../contexts/chessContext";
import "./check-status.css";
import { playAudio } from "../functions/playAudio";
import { useEffect } from "react";

export default function CheckStatus() {
  const { gameboard } = useChessContext();

  const checkTeam = gameboard.checkTeamColour;
  const checkmateTeam = gameboard.checkmateTeamColour;

  useEffect(() => {
    playAudio(gameboard);
  }, [gameboard]);

  function getCheckStatusMessage(): string {
    if (checkmateTeam != null) {
      return "mate";
    } else if (gameboard.isStalemate) {
      return "stalemate";
    } else if (checkTeam != null) {
      return "check: " + checkTeam;
    } else return "";
  }

  return <div className="check-status-container">{getCheckStatusMessage()}</div>;
}
