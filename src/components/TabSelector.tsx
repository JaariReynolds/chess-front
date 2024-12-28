import { useState } from "react";
import { TAB_NAMES } from "./ActionsTabs";
import "./tab-selector.css";

interface TabSelectorProps {
  setSelectedTab: React.Dispatch<React.SetStateAction<TAB_NAMES>>;
}

export default function TabSelector({ setSelectedTab }: TabSelectorProps) {
  const [translateAmount, setTranslateAmount] = useState<number>(0);

  function handleTabClick(tabName: TAB_NAMES, translateAmount: number) {
    setSelectedTab(tabName);
    setTranslateAmount(translateAmount);
  }

  return (
    <div className="tab-selector">
      <div
        className="tab-title"
        style={{ color: translateAmount == 100 ? "#998891" : "#fffff0" }}
        onClick={() => handleTabClick("Standard", 0)}
      >
        Standard
      </div>
      <div
        className="tab-title"
        style={{ color: translateAmount == 0 ? "#998891" : "#fffff0" }}
        onClick={() => handleTabClick("Advanced", 100)}
      >
        Advanced
      </div>
      <div className="tab-indicator" style={{ transform: `translate(${translateAmount}%)` }}></div>
    </div>
  );
}
