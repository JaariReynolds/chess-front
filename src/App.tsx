import "./App.css";
import { useChessContext } from "./contexts/chessContext";

function App() {
  const { teamActions, error } = useChessContext();

  if (error) return <div>Error: {error.message}</div>;

  return <>{JSON.stringify(teamActions, null, 2)};</>;
}

export default App;
