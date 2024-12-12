import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./advanced-options.css";
import { faPaste } from "@fortawesome/free-solid-svg-icons/faPaste";

interface FenInputProps {
  fenInputRef: React.RefObject<HTMLTextAreaElement>;
}

export default function FenInput({ fenInputRef }: FenInputProps) {
  async function handlePasteFromClipboard() {
    try {
      if (navigator.clipboard) {
        const clipboardText = await navigator.clipboard.readText();
        if (!fenInputRef.current) return;
        fenInputRef.current.value = clipboardText;
      } else {
        alert("Clipboard API not supported in this browser.");
      }
    } catch (error) {
      console.error("Failed to read clipboard content:", error);
    }
  }

  return (
    <div className="fen-input-container">
      <textarea
        className="fen-input"
        rows={3}
        maxLength={100}
        ref={fenInputRef}
        placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      />
      <button
        type="button"
        onClick={handlePasteFromClipboard}
        className="paste-button"
        title="paste from clipboard"
      >
        <FontAwesomeIcon icon={faPaste} fontSize="1.5rem" />
      </button>
    </div>
  );
}
