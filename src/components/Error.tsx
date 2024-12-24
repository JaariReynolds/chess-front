import { useChessContext } from "../contexts/chessContext";
import "./error.css";

export default function Error() {
  const { error } = useChessContext();
  const isError = error != null && error.message != null && error.message.length > 0;
  return (
    <div>
      {isError && <div className="error-container">{error && <div>{error.message}</div>}</div>}
    </div>
  );
}
