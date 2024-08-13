import "./App.css";
import { useChessContext } from "./contexts/chessContext";
import { Action } from "./types/gameboard";

function App() {
  const { teamActions, error, setSelectedAction } = useChessContext();

  const action: Action = {
    piece: {
      name: "Pawn",
      square: {
        x: 6,
        y: 0,
      },
      teamColour: "White",
      pieceValue: 1,
      hasMoved: false,
    },
    square: {
      x: 5,
      y: 0,
    },
    actionType: "Move",
    promoteCapturePoints: 0,
  };
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <button type="submit" onClick={() => setSelectedAction(action)}>
        set action
      </button>
      <div style={{ textAlign: "left" }}>
        <pre>{JSON.stringify(teamActions, null, 2)};</pre>
      </div>
    </>
  );
}

export default App;
