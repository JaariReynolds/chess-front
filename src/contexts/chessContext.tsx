import { createContext, useContext, useEffect, useState } from "react";
import { Action, AvailablePieceActions, Gameboard } from "../types/gameboard";
import { TeamColour } from "../types/literals";
import useInitialFetch from "../hooks/useInitialFetch";
import useFenImportFetch from "../hooks/useFenImportFetch";
import { ApiResponse } from "../types/apiResponse";
import { DataTransferObject } from "../types/dataTransferObjects";
import usePerformActionFetch from "../hooks/usePerformActionFetch";
import useBotActionFetch from "../hooks/useBotActionFetch";
import { TAB_NAMES } from "../constants";

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
  userTeamColour: TeamColour;
  setUserTeamColour: React.Dispatch<React.SetStateAction<TeamColour>>;
  fenString: string;
  setFenString: React.Dispatch<React.SetStateAction<string>>;
  selectedTab: TAB_NAMES;
  setSelectedTab: React.Dispatch<React.SetStateAction<TAB_NAMES>>;
  error: Error | null;
  fetchInitialBoard: () => Promise<void>;
  fetchFenBoard: () => Promise<void>;
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
  const [userTeamColour, setUserTeamColour] = useState<TeamColour>("White");
  const [botActionTrigger, setBotActionTrigger] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<TAB_NAMES>("Standard");

  const [error, setError] = useState<Error | null>(null);

  const [fenString, setFenString] = useState<string>("");

  const [data, setData] = useState<ApiResponse<DataTransferObject>>({
    success: false,
    data: null,
    error: null,
  });

  const { fetchInitialBoard } = useInitialFetch<DataTransferObject>(setData);

  const { fetchFenBoard } = useFenImportFetch<DataTransferObject>(fenString, setData);

  usePerformActionFetch(setData, gameboard, selectedAction);

  useBotActionFetch(setData, gameboard, botActionTrigger);

  useEffect(() => {
    setSelectedAction(null);
    setPieceActions(null);
    setError(null);

    if (data.success) {
      setGameboard(data.data!.gameboard);
      setTeamActions(data.data!.actions);
      if (data.data!.gameboard.currentTeamColour !== userTeamColour) {
        setBotActionTrigger((prev) => !prev);
      }
    } else {
      setError({ message: data.error } as Error);
    }
  }, [data]);

  return (
    <ChessContext.Provider
      value={{
        gameboard,
        teamActions,
        selectedAction,
        setSelectedAction,
        pieceActions,
        setPieceActions,
        userTeamColour,
        setUserTeamColour,
        fenString,
        setFenString,
        selectedTab,
        setSelectedTab,
        error,
        fetchInitialBoard,
        fetchFenBoard,
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
