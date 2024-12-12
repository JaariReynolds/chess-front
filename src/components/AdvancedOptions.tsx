import "./advanced-options.css";
import AdvancedReset from "./AdvancedReset";
import FenInput from "./FenInput";

export default function AdvancedOptions() {
  return (
    <div className="advanced-options-container">
      <FenInput />
      <AdvancedReset />
    </div>
  );
}
