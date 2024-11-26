import { useChessContext } from "../contexts/chessContext";

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

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2rem" }}
    >
      {getCheckStatusMessage()}
    </div>
  );
}
