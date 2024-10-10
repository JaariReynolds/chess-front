/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { DataTransferObject, GameboardActionRequestObject } from "../types/dataTransferObjects";
import { Action, AvailablePieceActions, Gameboard } from "../types/gameboard";

interface PerformActionEffectProps {
  url: string;
  currentGameboard: Gameboard;
  setUserActionPerformed: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAction: Action | null;
  setSelectedAction: React.Dispatch<React.SetStateAction<Action | null>>;
  setPieceActions: React.Dispatch<React.SetStateAction<AvailablePieceActions | null>>;
  setGameboard: React.Dispatch<React.SetStateAction<Gameboard>>;
  setTeamActions: React.Dispatch<React.SetStateAction<AvailablePieceActions[]>>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function performActionEffect({
  url,
  currentGameboard,
  setUserActionPerformed,
  selectedAction,
  setSelectedAction,
  setPieceActions,
  setGameboard,
  setTeamActions,
  setError,
  setLoading,
}: PerformActionEffectProps) {
  useEffect(() => {
    if (selectedAction == null) {
      return;
    }

    async function postData() {
      try {
        const requestBody = {
          gameboard: currentGameboard,
          action: selectedAction,
        } as GameboardActionRequestObject;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const { gameboard, actions }: DataTransferObject = await response.json();
        setGameboard(gameboard);
        setTeamActions(actions);
        // clear the actions from the previous move
        setSelectedAction(null);
        setPieceActions(null);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
        setUserActionPerformed(true);
      }
    }

    postData();
  }, [selectedAction]);
}
