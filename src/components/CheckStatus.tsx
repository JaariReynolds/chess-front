import { useChessContext } from "../contexts/chessContext";
import "./check-status.css";

export default function CheckStatus() {
  const { gameboard } = useChessContext();

  const checkTeam = gameboard.checkTeamColour;
  const checkmateTeam = gameboard.checkmateTeamColour;

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
