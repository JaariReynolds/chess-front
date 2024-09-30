import { useEffect, useState } from "react";
import { useChessContext } from "../contexts/chessContext";
import "./current-team-indicator.css";

export default function CurrentTeamIndicator() {
  const { gameboard } = useChessContext();
  const [translateAmount, setTranslateAmount] = useState<number>(0);

  useEffect(() => {
    setTranslateAmount(gameboard.currentTeamColour == "White" ? 0 : 100);
  }, [gameboard.currentTeamColour]);

  return (
    <div className="current-team-indicator-container">
      <div className="team-box-container">
        <div className="indicator" style={{ transform: `translate(${translateAmount}%)` }}></div>
        <div>White</div>
        <div>Black</div>
      </div>
    </div>
  );
}