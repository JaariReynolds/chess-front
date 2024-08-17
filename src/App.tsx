import "./App.css";
import CheckStatus from "./components/CheckStatus";
import Gameboard from "./components/gameboard";
import { useChessContext } from "./contexts/chessContext";

function App() {
  const { error } = useChessContext();

  return (
    <>
      {error && <div>Error: {error.message}</div>}
      {/* <button type="submit" onClick={() => setSelectedAction(action)}>
        set action
      </button> */}
      {/* <div style={{ textAlign: "left" }}>
        <pre>{JSON.stringify(teamActions, null, 2)};</pre>
      </div> */}
      <CheckStatus />
      <Gameboard />
    </>
  );
}

export default App;
