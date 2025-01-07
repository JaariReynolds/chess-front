import { useEffect } from "react";
import { useChessContext } from "../contexts/chessContext";
import { TeamColour } from "../types/literals";
import "./team-colour-selector.css";

export default function TeamColourSelector() {
  const { userTeamColour, selectedTab, setUserTeamColour, fetchInitialBoard, fetchFenBoard } =
    useChessContext();

  function handleColourChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserTeamColour(event.target.value as TeamColour);
  }

  useEffect(() => {
    switch (selectedTab) {
      case "Standard":
        fetchInitialBoard();
        break;
      case "Advanced":
        fetchFenBoard();
        break;
    }
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
