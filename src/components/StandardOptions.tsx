import StandardReset from "./StandardReset";
import "./standard-options.css";
import TeamColourSelector from "./TeamColourSelector";

export default function StandardOptions({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="standard-options-container" style={style}>
      <TeamColourSelector />
      <StandardReset />
    </div>
  );
}
