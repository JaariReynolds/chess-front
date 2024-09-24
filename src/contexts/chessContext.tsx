import { createContext, useContext, useEffect, useState } from "react";
import { Action, AvailablePieceActions, Gameboard } from "../types/gameboard";
import initializeGameEffect from "../functions/initializeGameEffect";
import performActionEffect from "../functions/performActionEffect";

interface ChessContextProviderProps {
  children: React.ReactNode;
}

interface ChessContext {
  gameboard: Gameboard;
  teamActions: AvailablePieceActions[];
  selectedAction: Action | null;
  setSelectedAction: React.Dispatch<React.SetStateAction<Action | null>>;
  pieceActions: AvailablePieceActions | null;
  setPieceActions: React.Dispatch<React.SetStateAction<AvailablePieceActions | null>>;
  promotionActionBase: Action | null;
  setPromotionActionBase: React.Dispatch<React.SetStateAction<Action | null>>;
  promotionSelectionVisible: boolean;
  setPromotionSelectionVisible: React.Dispatch<React.SetStateAction<boolean>>;
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
  whitePoints: 0,
  blackPoints: 0,
  checkedTeamColour: "None",
  checkmateTeamColour: "None",
};

const ChessContext = createContext<ChessContext | null>(null);

export default function ChessContextProvider({ children }: ChessContextProviderProps) {
  const [gameboard, setGameboard] = useState<Gameboard>(defaultGameboard);
  const [teamActions, setTeamActions] = useState<AvailablePieceActions[]>([]);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [pieceActions, setPieceActions] = useState<AvailablePieceActions | null>(null);

  const [promotionActionBase, setPromotionActionBase] = useState<Action | null>(null);
  const [promotionSelectionVisible, setPromotionSelectionVisible] = useState<boolean>(false);

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resetTrigger, setResetTrigger] = useState<boolean>(false);

  initializeGameEffect({
    url: "https://localhost:7179/api/chess/initialState",
    setGameboard,
    setTeamActions,
    setError,
    setLoading,
    resetTrigger,
  });

  useEffect(() => {
    setSelectedAction(null);
    setPieceActions(null);
    setPromotionActionBase(null);
    setPromotionSelectionVisible(false);
  }, [resetTrigger]);

  performActionEffect({
    url: "https://localhost:7179/api/chess/perform",
    currentGameboard: gameboard,
    selectedAction,
    setSelectedAction,
    setPieceActions,
    setGameboard,
    setTeamActions,
    setError,
    setLoading,
  });

  return (
    <ChessContext.Provider
      value={{
        gameboard,
        teamActions,
        selectedAction,
        setSelectedAction,
        pieceActions,
        setPieceActions,
        promotionActionBase,
        setPromotionActionBase,
        promotionSelectionVisible,
        setPromotionSelectionVisible,
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
