import { useCallback, useEffect, useState } from "react";
import { useChessContext } from "../contexts/chessContext";
import { DataTransferObject } from "../types/dataTransferObjects";

export function useChessFetch(url: string, options: RequestInit, fetchOnMount: boolean = true) {
  const { userTeamColour, setGameboard, setTeamActions, setBotActionTrigger } = useChessContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const abortController = new AbortController();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, { ...options, signal: abortController.signal });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const { gameboard, actions }: DataTransferObject = await response.json();

      if (gameboard.currentTeamColour != userTeamColour) {
        setBotActionTrigger((prev) => !prev);
      }

      setGameboard(gameboard);
      setTeamActions(actions);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (fetchOnMount) fetchData();
  }, [fetchOnMount, fetchData]);

  return { isLoading, error, fetchNow: fetchData };
}
