/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { Action, AvailablePieceActions, Gameboard } from "../types/gameboard";
import { DataTransferObject } from "../types/dataTransferObjects";
import { playActionAudio } from "../functions/playAudio";
import { BOT_PERFORM_ACTION_DELAY_MILLISECONDS } from "../constants";
import { TeamColour } from "../types/literals";

interface FetchBotActionEffectProps {
  url: string;
  currentGameboard: Gameboard;
  userTeamColour: TeamColour;
  botActionTrigger: boolean;
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
  userTeamColour,
  botActionTrigger,
  setSelectedAction,
  setPieceActions,
  setGameboard,
  setTeamActions,
  setError,
  setLoading,
}: FetchBotActionEffectProps) {
  useEffect(() => {
    if (currentGameboard.board.every((row) => row.every((piece) => piece === null))) return;

    if (currentGameboard.currentTeamColour == userTeamColour)
      console.error("tried to request a bot action for the wrong team!");
    if (currentGameboard.isGameOver) return;

    const abortController = new AbortController();

    async function postData() {
      try {
        setLoading(true);
        const start = Date.now();
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

        // If the elapsed time is less than the provided delay, wait the remaining time
        const elapsed = Date.now() - start;
        if (elapsed < BOT_PERFORM_ACTION_DELAY_MILLISECONDS) {
          await new Promise((resolve) =>
            setTimeout(resolve, BOT_PERFORM_ACTION_DELAY_MILLISECONDS - elapsed)
          );
        }

        playActionAudio(gameboard.previousActions[gameboard.previousActions.length - 1]);

        setGameboard(gameboard);
        setSelectedAction(null);
        setPieceActions(null);
        setTeamActions(actions);
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
  }, [botActionTrigger]);
}
