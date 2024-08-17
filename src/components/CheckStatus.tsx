import { useChessContext } from "../contexts/chessContext";

export default function CheckStatus() {
  const { gameboard } = useChessContext();

  const checkedTeam = gameboard.checkedTeamColour;
  const checkmateTeam = gameboard.checkmateTeamColour;

  function getCheckStatusMessage(): string {
    let message = "";
    if (checkmateTeam != "None") {
      message = "mate: " + checkmateTeam;
    } else if (checkedTeam != "None") {
      message = "checked: " + checkedTeam;
    }

    return message;
  }

  return <>{getCheckStatusMessage()}</>;
}
