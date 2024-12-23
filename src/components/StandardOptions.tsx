import { useState } from "react";
import { TeamColour } from "../types/literals";
import StandardReset from "./StandardReset";
import "./standard-options.css";
import TeamColourSelector from "./TeamColourSelector";

export default function StandardOptions({ style }: { style?: React.CSSProperties }) {
  const [selectedColour, setSelectedColour] = useState<TeamColour>("White");

  return (
    <div className="standard-options-container" style={style}>
      <TeamColourSelector selectedColour={selectedColour} setSelectedColour={setSelectedColour} />
      <StandardReset selectedColour={selectedColour} />
    </div>
  );
}
