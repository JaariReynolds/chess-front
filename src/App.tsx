import "./App.css";
import Gameboard from "./components/Gameboard";
import Pieces from "./components/Pieces";
import PromotionSelection from "./components/PromotionSelection";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app-container">
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
