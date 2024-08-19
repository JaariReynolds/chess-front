import ActionHistory from "./ActionHistory";
import CheckStatus from "./CheckStatus";

export default function Sidebar() {
  return (
    <div style={{ display: "grid", gridTemplateRows: "3fr 1fr" }}>
      <ActionHistory />
      <CheckStatus />
    </div>
  );
}
