import "./App.css";
import CurrentTeamIndicator from "./components/CurrentTeamIndicator";
import Gameboard from "./components/Gameboard";
import Pieces from "./components/Pieces";
import PromotionSelection from "./components/PromotionSelection";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app-container">
      <CurrentTeamIndicator />
      <div className="gameboard-container">
        <PromotionSelection />
        <Gameboard />
        <Pieces />
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
