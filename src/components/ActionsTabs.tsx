import { useState } from "react";
import StandardOptions from "./StandardOptions";
import TabSelector from "./TabSelector";
import "./actions-tabs.css";
import AdvancedOptions from "./AdvancedOptions";
export type TAB_NAMES = "Standard" | "Advanced";

export default function ActionsTabs() {
  const [selectedTab, setSelectedTab] = useState<TAB_NAMES>("Standard");

  return (
    <div className="actions-tabs-container">
      <TabSelector setSelectedTab={setSelectedTab} />
      {selectedTab == "Standard" ? <StandardOptions /> : <AdvancedOptions />}
    </div>
  );
}
