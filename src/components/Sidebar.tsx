import ActionHistory from "./ActionHistory";
import Reset from "./Reset";
import "../components/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <Reset />
      <ActionHistory />
    </div>
  );
}
