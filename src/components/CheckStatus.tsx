import { useChessContext } from "../contexts/chessContext";

export default function CheckStatus() {
  const { gameboard } = useChessContext();

  const checkedTeam = gameboard.checkedTeamColour;
  const checkmateTeam = gameboard.checkmateTeamColour;

  function getCheckStatusMessage(): string {
    let message = "";
    if (checkmateTeam != null) {
      message = "mate: " + checkmateTeam;
    } else if (checkedTeam != null) {
      message = "checked: " + checkedTeam;
    }

    return message;
  }

  return <div style={{ border: "1px solid black" }}>{getCheckStatusMessage()}</div>;
}
