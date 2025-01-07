import StandardOptions from "./StandardOptions";
import TabSelector from "./TabSelector";
import "./actions-tabs.css";
import AdvancedOptions from "./AdvancedOptions";
import GeneralOptions from "./GeneralOptions";
import { useChessContext } from "../contexts/chessContext";

export default function ActionsTabs() {
  const { selectedTab } = useChessContext();

  return (
    <div className="actions-tabs-container">
      <TabSelector />
      <GeneralOptions />
      <StandardOptions style={{ display: selectedTab == "Standard" ? "grid" : "none" }} />
      <AdvancedOptions style={{ display: selectedTab == "Advanced" ? "grid" : "none" }} />
    </div>
  );
}
