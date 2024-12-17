/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { InitializeGameEffectProps } from "./initializeGameEffect";
import { DataTransferObject, FenStringObject } from "../types/dataTransferObjects";

interface InitializeFenGameEffectProps extends InitializeGameEffectProps {
  fenString: string;
}

export default function initializeFenGameEffect({
  url,
  setGameboard,
  setTeamActions,
  userTeamColour,
  setBotActionTrigger,
  setError,
  setLoading,
  resetTrigger,
  fenString,
}: InitializeFenGameEffectProps) {
  useEffect(() => {
    const abortController = new AbortController();

    const requestBody = { fenString: fenString } as FenStringObject;

    const fetchData = async () => {
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
