import { useChessContext } from "../contexts/chessContext";
import "./error.css";

export default function Error() {
  const { error } = useChessContext();
  const isError = error != null && error.message != null && error.message.length > 0;
  return (
    <>
      {isError && (
        <div className="error-container">
          {error && <div className="error-text">{error.message}</div>}
        </div>
      )}
    </>
  );
}
