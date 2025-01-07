import { useEffect, useState } from "react";
import useFenExportFetch from "../hooks/useFenExportFetch";
import { useChessContext } from "../contexts/chessContext";
import { ApiResponse } from "../types/apiResponse";
import { faCopy, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./export-fen.css";

export default function ExportFen() {
  const { gameboard } = useChessContext();
  const [showFen, setShowFen] = useState<boolean>(false);
  const [copyMessage, setCopyMessage] = useState<string>("");
  const [data, setData] = useState<ApiResponse<string>>({
    success: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    setShowFen(false);
  }, [gameboard]);

  const { fetchFenExport } = useFenExportFetch<string>(gameboard, setData);

  function handleButtonClick() {
    fetchFenExport();
    setShowFen(true);
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(data.data!);
      setCopyMessage("Copied to clipboard!");
    } catch (error) {
      setCopyMessage("Failed to copy!");
      console.error(error);
    }
  }

  return (
    <div className="export-fen-container">
      {!showFen && (
        <button
          className="generate-button"
          type="button"
          title="generate FEN"
          onClick={handleButtonClick}
        >
          <FontAwesomeIcon icon={faDownload} fontSize="2.5rem" />
          <span>Generate FEN</span>
        </button>
      )}
      {showFen && (
        <button
          className="generated-fen-container"
          type="button"
          title="copy to clipboard"
          onClick={copyToClipboard}
        >
          <div className="fen-text">{data.success ? data.data : data.error}</div>
          <FontAwesomeIcon className="copy-icon" icon={faCopy} fontSize="1.5rem" />
        </button>
      )}
    </div>
  );
}
