import { useChessContext } from "../contexts/chessContext";
import { actionToString } from "../functions/objectsToString";
import "../components/action-history.css";

export default function ActionHistory() {
  const { gameboard } = useChessContext();

  return (
    <div className="action-history-container">
      <p>History</p>
      <div className="grid-container">
        {gameboard.previousActions.map((action, index) => {
          return <div key={index}>{actionToString(action)}</div>;
        })}
      </div>
    </div>
  );
}
