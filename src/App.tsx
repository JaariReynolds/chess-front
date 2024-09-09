import "./App.css";
import Gameboard from "./components/Gameboard";
import PromotionSelection from "./components/PromotionSelection";
import Sidebar from "./components/Sidebar";
import { useChessContext } from "./contexts/chessContext";

function App() {
  const { promotionSelectionVisible } = useChessContext();

  return (
    <div className="app-container">
      <div className="gameboard-container">
        {promotionSelectionVisible && <PromotionSelection />}
        <Gameboard />
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
