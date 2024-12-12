import { TeamColour } from "../types/literals";
import "./game-options.css";

interface StandardOptionsProps {
  selectedColour: TeamColour;
  setSelectedColour: React.Dispatch<React.SetStateAction<TeamColour>>;
}

export default function StandardOptions({
  selectedColour,
  setSelectedColour,
}: StandardOptionsProps) {
  function handleColourChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedColour(event.target.value as TeamColour);
  }

  return (
    <div className="game-options-container">
      <div className="teamcolour-selector">
        <div className="teamcolour-title">Play as:</div>

        <label className="colour-option white" title="White">
          <input
            title="White"
            type="radio"
            name="teamcolour"
            value="White"
            checked={selectedColour == "White"}
            onChange={handleColourChange}
          />
        </label>

        <label className="colour-option black" title="Black">
          <input
            title="Black"
            type="radio"
            name="teamcolour"
            value="Black"
            checked={selectedColour == "Black"}
            onChange={handleColourChange}
          />
        </label>
      </div>
    </div>
  );
}
