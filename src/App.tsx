import "./App.css";
import Gameboard from "./components/Gameboard";
import PromotionSelection from "./components/PromotionSelection";
import Sidebar from "./components/Sidebar";
import { useChessContext } from "./contexts/chessContext";

function App() {
  const { error, promotionSelectionVisible } = useChessContext();

  return (
    <div className="app-container">
      {/* {error && <div>Error: {error.message}</div>} */}

      {promotionSelectionVisible && <PromotionSelection />}
      <Gameboard />
      <Sidebar />
    </div>
  );
}

export default App;
