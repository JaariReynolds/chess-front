import { useEffect } from "react";
import { ApiResponse } from "../types/apiResponse";
import { Gameboard } from "../types/gameboard";
import { useFetch } from "./useFetch";
import { BOT_PERFORM_ACTION_DELAY_MILLISECONDS } from "../constants";

export default function useBotActionFetch<T>(
  setData: React.Dispatch<React.SetStateAction<ApiResponse<T>>>,
  gameboard: Gameboard,
  botActionTrigger: boolean
) {
  const { fetchNow } = useFetch(
    "http://localhost:7179/api/chess/botAction",
    setData,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameboard: gameboard }),
    },
    false,
    BOT_PERFORM_ACTION_DELAY_MILLISECONDS
  );

  useEffect(() => {
    if (gameboard.board.every((row) => row.every((piece) => piece === null))) return;

    if (gameboard.isGameOver) return;

    fetchNow();
  }, [botActionTrigger]);
}
