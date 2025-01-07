import StandardReset from "./StandardReset";
import "./standard-options.css";

export default function StandardOptions({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="standard-options-container" style={style}>
      <StandardReset />
    </div>
  );
}
