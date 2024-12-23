import { useEffect } from "react";
import { useChessContext } from "../contexts/chessContext";
import { TeamColour } from "../types/literals";

export default function TeamColourSelector() {
  const { userTeamColour, setUserTeamColour, fetchInitialBoard } = useChessContext();

  function handleColourChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserTeamColour(event.target.value as TeamColour);
  }

  useEffect(() => {
    fetchInitialBoard();
  }, [userTeamColour]);

  return (
    <div className="teamcolour-selector">
      <div className="teamcolour-title" style={{ margin: "auto 0" }}>
        Play as:
      </div>
      <label className="colour-option white" title="White">
        <input
          title="White"
          type="radio"
          name="teamcolour"
          value="White"
          checked={userTeamColour == "White"}
          onChange={handleColourChange}
        />
      </label>
      <label className="colour-option black" title="Black">
        <input
          title="Black"
          type="radio"
          name="teamcolour"
          value="Black"
          checked={userTeamColour == "Black"}
          onChange={handleColourChange}
        />
      </label>
    </div>
  );
}
