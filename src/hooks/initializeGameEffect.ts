/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { AvailablePieceActions, Gameboard } from "../types/gameboard";
import { DataTransferObject } from "../types/dataTransferObjects";
import { TeamColour } from "../types/literals";

interface InitializeGameEffectProps {
  url: string;
  setGameboard: React.Dispatch<React.SetStateAction<Gameboard>>;
  setTeamActions: React.Dispatch<React.SetStateAction<AvailablePieceActions[]>>;
  userTeamColour: TeamColour;
  setBotActionTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  resetTrigger: boolean;
}

export default function initializeGameEffect({
  url,
  setGameboard,
  setTeamActions,
  userTeamColour,
  setBotActionTrigger,
  setError,
  setLoading,
  resetTrigger,
}: InitializeGameEffectProps) {
  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const { gameboard, actions }: DataTransferObject = await response.json();

        // if the user's selected team colour is not the initial chess game teamcolour (white), signal to fetch bot action
        if (gameboard.currentTeamColour != userTeamColour) {
          setBotActionTrigger((prev) => !prev);
        }

        setTeamActions(actions);
        setGameboard(gameboard);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [resetTrigger]);
}
