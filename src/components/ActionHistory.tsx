import { useChessContext } from "../contexts/chessContext";
import "../components/action-history.css";
import { useEffect, useRef } from "react";

export default function ActionHistory() {
  const { gameboard } = useChessContext();

  const gridContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridContainerRef.current)
      gridContainerRef.current.scrollTop = gridContainerRef.current.scrollHeight;
  }, [gameboard]);

  return (
    <div className="action-history-container">
      <div className="grid-container" ref={gridContainerRef}>
        {gameboard.previousActions.map((action, index) => {
          if (index % 2 == 0) {
            return (
              <>
                <span>{index / 2 + 1}.</span>
                <span key={index}>{action}</span>
              </>
            );
          }
          return <span key={index}>{action}</span>;
        })}
      </div>
    </div>
  );
}
