import ActionHistory from "./ActionHistory";
import ActionsTabs from "./ActionsTabs";
import "../components/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <ActionsTabs />
      <ActionHistory />
    </div>
  );
}
