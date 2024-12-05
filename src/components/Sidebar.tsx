import ActionHistory from "./ActionHistory";
import Reset from "./Reset";
import "../components/sidebar.css";
import GameOptions from "./GameOptions";
import { useState } from "react";
import { TeamColour } from "../types/literals";

export default function Sidebar() {
  const [selectedColour, setSelectedColour] = useState<TeamColour>("White");

  return (
    <div className="sidebar-container">
      <Reset selectedColour={selectedColour} />
      <GameOptions selectedColour={selectedColour} setSelectedColour={setSelectedColour} />
      <ActionHistory />
    </div>
  );
}
