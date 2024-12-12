import ActionHistory from "./ActionHistory";
import Reset from "./Reset";
import "../components/sidebar.css";
import StandardOptions from "./StandardOptions";
import { useState } from "react";
import { TeamColour } from "../types/literals";

export default function Sidebar() {
  const [selectedColour, setSelectedColour] = useState<TeamColour>("White");

  return (
    <div className="sidebar-container">
      <Reset selectedColour={selectedColour} />
      <StandardOptions selectedColour={selectedColour} setSelectedColour={setSelectedColour} />
      <ActionHistory />
    </div>
  );
}
