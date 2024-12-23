import "./advanced-options.css";
import AdvancedReset from "./AdvancedReset";
import FenInput from "./FenInput";

export default function AdvancedOptions({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="advanced-options-container" style={style}>
      <FenInput />
      <AdvancedReset />
    </div>
  );
}
