import CheckStatus from "./CheckStatus";
import CurrentTeamIndicator from "./CurrentTeamIndicator";
import "./topbar.css";

export default function Topbar() {
  return (
    <>
      <div className="topbar-container">
        <CurrentTeamIndicator />
        <CheckStatus />
      </div>
    </>
  );
}
