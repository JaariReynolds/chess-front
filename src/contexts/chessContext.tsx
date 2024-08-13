import { createContext, useContext, useState } from "react";
import { AvailableTeamActions, Gameboard } from "../types/gameboard";
import initializeGame from "../functions/initializeGame";

interface ChessContextProviderProps {
  children: React.ReactNode;
}

interface ChessContext {
  gameboard: Gameboard;
  teamActions: AvailableTeamActions;
  error: Error | null;
  loading: boolean;
}

const defaultGameboard: Gameboard = {
  board: Array(8)
    .fill(null)
    .map(() => Array(8).fill(null)), // Empty 8x8 board
  currentTeamColour: "White",
  previousActions: [],
  whitePoints: 0,
  blackPoints: 0,
  checkedTeamColour: "None",
  checkmateTeamColour: "None",
};

const defaultTeamActions: AvailableTeamActions = {
  actions: [],
};

const ChessContext = createContext<ChessContext | null>(null);

export default function ChessContextProvider({ children }: ChessContextProviderProps) {
  const [gameboard, setGameboard] = useState<Gameboard>(defaultGameboard);
  const [teamActions, setTeamActions] = useState<AvailableTeamActions>(defaultTeamActions);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  initializeGame({
    url: "https://localhost:7179/api/chess/initialState",
    setGameboard: setGameboard,
    setTeamActions: setTeamActions,
    setError: setError,
    setLoading: setLoading,
  });

  return (
    <ChessContext.Provider value={{ gameboard, teamActions, error, loading }}>
      {children}
    </ChessContext.Provider>
  );
}

export function useChessContext() {
  const context = useContext(ChessContext);
  if (!context) {
    throw new Error("useChessContext must be used within a ChessContextProvider");
  }
  return context;
}
