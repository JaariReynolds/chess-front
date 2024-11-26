import ActionHistory from "./ActionHistory";
import CheckStatus from "./CheckStatus";
import Reset from "./Reset";
import "../components/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <Reset />
      <CheckStatus />
      <ActionHistory />
    </div>
  );
}
