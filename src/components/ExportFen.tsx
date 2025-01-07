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
  const [fenOutput, setFenOutput] = useState<string>("");
  const [copyMessage, setCopyMessage] = useState<string>("");
  const [data, setData] = useState<ApiResponse<string>>({
    success: false,
    data: null,
    error: null,
  });

  const { fetchFenExport } = useFenExportFetch<string>(gameboard, setData);

  // require the "Generate FEN" button to be pressed again when gameboard changes
  useEffect(() => {
    setShowFen(false);
  }, [gameboard]);

  // show the copy message for 1 second after it has updated
  useEffect(() => {
    if (copyMessage.length == 0) return;

    setFenOutput(copyMessage);
    setTimeout(() => {
      setFenOutput(data.success ? data.data! : data.error!);
      setCopyMessage("");
    }, 1000);
  }, [copyMessage]);

  // when data is set from fetch, set generated fen/error
  useEffect(() => {
    setFenOutput(data.success ? data.data! : data.error!);
    setShowFen(true);
  }, [data]);

  async function copyToClipboard() {
    try {
      if (data.data == null) throw Error("Nothing to copy!");
      await navigator.clipboard.writeText(data.data!);
      setCopyMessage("Copied to clipboard!");
    } catch (error) {
      setCopyMessage((error as Error).message);
    }
  }

  return (
    <div className="export-fen-container">
      {!showFen && (
        <button
          className="generate-button"
          type="button"
          title="generate FEN"
          onClick={fetchFenExport}
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
          <div className="fen-text">{fenOutput}</div>
          <FontAwesomeIcon className="copy-icon" icon={faCopy} fontSize="1.5rem" />
        </button>
      )}
    </div>
  );
}
