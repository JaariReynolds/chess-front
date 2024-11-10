import { useChessContext } from "../contexts/chessContext";

export default function CheckStatus() {
  const { gameboard } = useChessContext();

  const checkTeam = gameboard.checkTeamColour;
  const checkmateTeam = gameboard.checkmateTeamColour;

  function getCheckStatusMessage(): string {
    if (checkmateTeam != null) {
      return "mate: " + checkmateTeam;
    } else if (gameboard.isStalemate) {
      return "stalemate";
    } else if (checkTeam != null) {
      return "check: " + checkTeam;
    } else return "";
  }

  return <div style={{ border: "1px solid black" }}>{getCheckStatusMessage()}</div>;
}
