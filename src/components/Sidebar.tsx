import ActionHistory from "./ActionHistory";
import CheckStatus from "./CheckStatus";
import Reset from "./Reset";

export default function Sidebar() {
  return (
    <div style={{ display: "grid", gridTemplateRows: "3fr 1fr 1fr" }}>
      <ActionHistory />
      <CheckStatus />
      <Reset />
    </div>
  );
}
