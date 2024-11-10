import { createContext, useContext, useEffect, useState } from "react";
import { Action, AvailablePieceActions, Gameboard } from "../types/gameboard";
import initializeGameEffect from "../hooks/initializeGameEffect";
import performActionEffect from "../hooks/performActionEffect";
import fetchBotActionEffect from "../hooks/fetchBotActionEffect";

interface ChessContextProviderProps {
  children: React.ReactNode;
}

interface ChessContext {
  gameboard: Gameboard;
  teamActions: AvailablePieceActions[];
  userActionPerformed: boolean;
  selectedAction: Action | null;
  setSelectedAction: React.Dispatch<React.SetStateAction<Action | null>>;
  pieceActions: AvailablePieceActions | null;
  setPieceActions: React.Dispatch<React.SetStateAction<AvailablePieceActions | null>>;
  resetTrigger: boolean;
  setResetTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  error: Error | null;
  loading: boolean;
}

const defaultGameboard: Gameboard = {
  board: Array(8)
    .fill(null)
    .map(() => Array(8).fill(null)), // Empty 8x8 board
  currentTeamColour: "White",
  previousActions: [],
  lastPerformedAction: null,
  whitePoints: 0,
  blackPoints: 0,
  checkTeamColour: null,
  checkmateTeamColour: null,
  isStalemate: false,
  isGameOver: false,
};

const ChessContext = createContext<ChessContext | null>(null);

export default function ChessContextProvider({ children }: ChessContextProviderProps) {
  const [gameboard, setGameboard] = useState<Gameboard>(defaultGameboard);
  const [teamActions, setTeamActions] = useState<AvailablePieceActions[]>([]);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [pieceActions, setPieceActions] = useState<AvailablePieceActions | null>(null);

  const [userActionPerformed, setUserActionPerformed] = useState<boolean>(false);

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resetTrigger, setResetTrigger] = useState<boolean>(false);

  initializeGameEffect({
    url: "http://localhost:7179/api/chess/initialState",
    setUserActionPerformed,
    setGameboard,
    setTeamActions,
    setError,
    setLoading,
    resetTrigger,
  });

  performActionEffect({
    url: "http://localhost:7179/api/chess/perform",
    currentGameboard: gameboard,
    setUserActionPerformed,
    selectedAction,
    setSelectedAction,
    setPieceActions,
    setGameboard,
    setTeamActions,
    setError,
    setLoading,
  });

  fetchBotActionEffect({
    url: "http://localhost:7179/api/chess/botAction",
    currentGameboard: gameboard,
    userActionPerformed,
    setUserActionPerformed,
    setSelectedAction,
    setPieceActions,
    setGameboard,
    setTeamActions,
    setError,
    setLoading,
  });

  useEffect(() => {
    setSelectedAction(null);
    setPieceActions(null);
  }, [resetTrigger]);

  return (
    <ChessContext.Provider
      value={{
        gameboard,
        teamActions,
        userActionPerformed,
        selectedAction,
        setSelectedAction,
        pieceActions,
        setPieceActions,
        resetTrigger,
        setResetTrigger,
        error,
        loading,
      }}
    >
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
