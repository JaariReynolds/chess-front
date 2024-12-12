import { TeamColour } from "../types/literals";

interface TeamColourSelectorProps {
  selectedColour: TeamColour;
  setSelectedColour: React.Dispatch<React.SetStateAction<TeamColour>>;
}

export default function TeamColourSelector({
  selectedColour,
  setSelectedColour,
}: TeamColourSelectorProps) {
  function handleColourChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedColour(event.target.value as TeamColour);
  }
  return (
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
  );
}
