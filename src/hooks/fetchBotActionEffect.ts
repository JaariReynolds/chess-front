/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { Action, AvailablePieceActions, Gameboard } from "../types/gameboard";
import { DataTransferObject } from "../types/dataTransferObjects";
import isCaptureActionType from "../functions/isCaptureActionType";
const moveAudio = new Audio("/src/sounds/move.wav");
const captureAudio = new Audio("/src/sounds/capture.wav");

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

    async function postData() {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentGameboard),
        });

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const { gameboard, actions }: DataTransferObject = await response.json();

        const audioElement = isCaptureActionType(
          gameboard.previousActions[gameboard.previousActions.length - 1]
        )
          ? captureAudio
          : moveAudio;
        audioElement.play();

        setGameboard(gameboard);
        setSelectedAction(null);
        setPieceActions(null);
        setTeamActions(actions);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
        setUserActionPerformed(false);
      }
    }

    setTimeout(() => {
      postData();
    }, 500); // hardcoded rn to be double the length of time of an 'action transition'
  }, [userActionPerformed]);
}
