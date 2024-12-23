import { useState } from "react";
import { useChessFetch } from "../hooks/useChessFetch";
import "./advanced-options.css";
import AdvancedReset from "./AdvancedReset";
import FenInput from "./FenInput";
import { FenStringObject } from "../types/dataTransferObjects";

export default function AdvancedOptions({ style }: { style?: React.CSSProperties }) {
  const [fenString, setFenString] = useState<string>("");

  const { isLoading, error, fetchNow } = useChessFetch(
    "http://localhost:7179/api/chess/fen",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fenString: fenString } as FenStringObject),
    },
    false
  );

  return (
    <div className="advanced-options-container" style={style}>
      <FenInput fenString={fenString} setFenString={setFenString} />
      <AdvancedReset fenString={fenString} setFenString={setFenString} fetchNow={fetchNow} />
      {error && <div>{error.name}</div>}
    </div>
  );
}
