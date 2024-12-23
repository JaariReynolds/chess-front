import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reset.css";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function AdvancedReset({
  fenString,
  setFenString,
  fetchNow,
}: {
  fenString: string;
  setFenString: React.Dispatch<React.SetStateAction<string>>;
  fetchNow: () => Promise<void>;
}) {
  function handleReset() {
    setFenString((prev) => prev.trim());
    fetchNow();
  }

  return (
    <button
      className="reset-container"
      title="load from FEN"
      disabled={fenString.length == 0}
      onClick={handleReset}
    >
      <FontAwesomeIcon icon={faUpload} size="3x" />
    </button>
  );
}
