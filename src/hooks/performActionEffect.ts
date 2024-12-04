/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { DataTransferObject, GameboardActionRequestObject } from "../types/dataTransferObjects";
import { Action, AvailablePieceActions, Gameboard } from "../types/gameboard";

interface PerformActionEffectProps {
  url: string;
  currentGameboard: Gameboard;
  selectedAction: Action | null;
  setBotActionTrigger: React.Dispatch<React.SetStateAction<boolean>>;
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
  selectedAction,
  setBotActionTrigger,
  setSelectedAction,
  setPieceActions,
  setGameboard,
  setTeamActions,
  setError,
  setLoading,
}: PerformActionEffectProps) {
  useEffect(() => {
    if (selectedAction == null) return;

    const abortController = new AbortController();

    const requestBody = {
      gameboard: currentGameboard,
      action: selectedAction,
    } as GameboardActionRequestObject;

    async function postData() {
      try {
        setLoading(true);

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const { gameboard, actions }: DataTransferObject = await response.json();
        setGameboard(gameboard);
        setTeamActions(actions);
        setBotActionTrigger((prev) => !prev); // any time an action is performed, trigger to request for the bot's action

        // clear the actions from the previous move
        setSelectedAction(null);
        setPieceActions(null);
      } catch (error) {
        const errorObject = error as Error;
        if (errorObject.name === "AbortError") {
          console.error("Fetch aborted");
        } else {
          setError(errorObject);
        }
      } finally {
        setLoading(false);
      }
    }

    postData();

    return () => {
      abortController.abort();
    };
  }, [selectedAction]);
}
