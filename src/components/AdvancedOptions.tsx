import { useRef } from "react";
import "./advanced-options.css";
import AdvancedReset from "./AdvancedReset";
import FenInput from "./FenInput";

export default function AdvancedOptions() {
  const fenInputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="advanced-options-container">
      <FenInput fenInputRef={fenInputRef} />
      <AdvancedReset fenInputRef={fenInputRef} />
    </div>
  );
}
