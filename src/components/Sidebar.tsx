import ActionHistory from "./ActionHistory";
import ActionsTabs from "./ActionsTabs";
import "../components/sidebar.css";
import ExportFen from "./ExportFen";

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <ActionsTabs />
      <ActionHistory />
      <ExportFen />
    </div>
  );
}
