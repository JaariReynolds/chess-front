import { useState } from "react";
import { TeamColour } from "../types/literals";
import Reset from "./Reset";
import "./standard-options.css";
import TeamColourSelector from "./TeamColourSelector";

export default function StandardOptions() {
  const [selectedColour, setSelectedColour] = useState<TeamColour>("White");

  return (
    <div className="standard-options-container">
      <TeamColourSelector selectedColour={selectedColour} setSelectedColour={setSelectedColour} />
      <Reset selectedColour={selectedColour} />
    </div>
  );
}
