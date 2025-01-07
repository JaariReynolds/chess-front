import { useEffect } from "react";
import { ApiResponse } from "../types/apiResponse";
import { GameboardActionRequestObject } from "../types/dataTransferObjects";
import { Action, Gameboard } from "../types/gameboard";
import { useFetch } from "./useFetch";

export default function usePerformActionFetch<T>(
  setData: React.Dispatch<React.SetStateAction<ApiResponse<T>>>,
  gameboard: Gameboard,
  selectedAction: Action | null
) {
  const { fetchNow } = useFetch<T>(
    "http://localhost:7179/api/chess/perform",
    setData,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameboard,
        action: selectedAction,
      } as GameboardActionRequestObject),
    },
    false
  );

  useEffect(() => {
    if (selectedAction == null) return;
    fetchNow();
  }, [selectedAction]);
}
