/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { AvailableTeamActions, Gameboard } from "../types/gameboard";
import { DataTransferObject } from "../types/dataTransferObjects";

interface InitialFetchProps {
  url: string;
  setGameboard: React.Dispatch<React.SetStateAction<Gameboard>>;
  setTeamActions: React.Dispatch<React.SetStateAction<AvailableTeamActions>>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initializeGame = ({
  url,
  setGameboard,
  setTeamActions,
  setError,
  setLoading,
}: InitialFetchProps) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        const { gameboard, actions }: DataTransferObject = await response.json();
        setGameboard(gameboard);
        setTeamActions(actions);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
};

export default initializeGame;
