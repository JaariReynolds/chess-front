import { createContext, useContext, useState } from "react";
import { Action, AvailableTeamActions, Gameboard } from "../types/gameboard";
import initializeGameEffect from "../functions/initializeGameEffect";
import performActionEffect from "../functions/performActionEffect";

interface ChessContextProviderProps {
  children: React.ReactNode;
}

interface ChessContext {
  gameboard: Gameboard;
  teamActions: AvailableTeamActions;
  setSelectedAction: React.Dispatch<React.SetStateAction<Action | null>>;
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
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  initializeGameEffect({
    url: "https://localhost:7179/api/chess/initialState",
    setGameboard,
    setTeamActions,
    setError,
    setLoading,
  });

  performActionEffect({
    url: "https://localhost:7179/api/chess/perform",
    currentGameboard: gameboard,
    selectedAction,
    setGameboard,
    setTeamActions,
    setError,
    setLoading,
  });

  return (
    <ChessContext.Provider value={{ gameboard, teamActions, setSelectedAction, error, loading }}>
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
