import { useChessContext } from "../contexts/chessContext";
import "../components/action-history.css";
import { useEffect, useRef } from "react";
import React from "react";

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
              <React.Fragment key={`${index}-white`}>
                <span>{index / 2 + 1}.</span>
                <span>{action}</span>
              </React.Fragment>
            );
          }
          return <span key={`${index}-black`}>{action}</span>;
        })}
      </div>
    </div>
  );
}
