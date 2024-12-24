import "./App.css";
import Error from "./components/Error";
import Gameboard from "./components/gameboard";
import Pieces from "./components/Pieces";
import PromotionSelection from "./components/PromotionSelection";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import PromotionContextProvider from "./contexts/promotionContext";

function App() {
  return (
    <div className="app-container">
      <Topbar />
      <div className="gameboard-container">
        <PromotionContextProvider>
          <PromotionSelection />
          <Gameboard />
        </PromotionContextProvider>
        <Pieces />
      </div>
      <Error />
      <Sidebar />
    </div>
  );
}

export default App;
