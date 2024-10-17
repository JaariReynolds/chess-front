import "./App.css";
import CurrentTeamIndicator from "./components/CurrentTeamIndicator";
import Gameboard from "./components/gameboard";
import Pieces from "./components/Pieces";
import PromotionSelection from "./components/PromotionSelection";
import Sidebar from "./components/Sidebar";
import PromotionContextProvider from "./contexts/promotionContext";

function App() {
  return (
    <div className="app-container">
      <CurrentTeamIndicator />
      <div className="gameboard-container">
        <PromotionContextProvider>
          <PromotionSelection />
          <Gameboard />
        </PromotionContextProvider>
        <Pieces />
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
