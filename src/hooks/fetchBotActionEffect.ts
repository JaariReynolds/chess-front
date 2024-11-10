/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { Action, AvailablePieceActions, Gameboard } from "../types/gameboard";
import { DataTransferObject } from "../types/dataTransferObjects";
import { playActionAudio } from "../functions/playAudio";

interface FetchBotActionEffectProps {
  url: string;
  currentGameboard: Gameboard;
  userActionPerformed: boolean;
  setUserActionPerformed: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAction: React.Dispatch<React.SetStateAction<Action | null>>;
  setPieceActions: React.Dispatch<React.SetStateAction<AvailablePieceActions | null>>;
  setGameboard: React.Dispatch<React.SetStateAction<Gameboard>>;
  setTeamActions: React.Dispatch<React.SetStateAction<AvailablePieceActions[]>>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function fetchBotActionEffect({
  url,
  currentGameboard,
  userActionPerformed,
  setUserActionPerformed,
  setSelectedAction,
  setPieceActions,
  setGameboard,
  setTeamActions,
  setError,
  setLoading,
}: FetchBotActionEffectProps) {
  useEffect(() => {
    if (userActionPerformed == false) return;

    if (currentGameboard.isGameOver) {
      return;
    }

    const abortController = new AbortController();
    let timeoutId: number;

    async function postData() {
      try {
        setLoading(true);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameboard: currentGameboard }),
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const { gameboard, actions }: DataTransferObject = await response.json();

        playActionAudio(gameboard.previousActions[gameboard.previousActions.length - 1]);

        setGameboard(gameboard);
        setSelectedAction(null);
        setPieceActions(null);
        setTeamActions(actions);
        setUserActionPerformed(false);
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

    timeoutId = setTimeout(() => {
      postData();
    }, 500); // hardcoded rn to be double the length of time of an 'action transition' (not final)

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [userActionPerformed]);
}
