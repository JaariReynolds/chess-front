import "./App.css";
import CheckStatus from "./components/CheckStatus";
import Gameboard from "./components/Gameboard";
import PromotionSelection from "./components/PromotionSelection";
import { useChessContext } from "./contexts/chessContext";

function App() {
  const { error, promotionSelectionVisible } = useChessContext();

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
      {promotionSelectionVisible && <PromotionSelection />}
      <Gameboard />
    </>
  );
}

export default App;
