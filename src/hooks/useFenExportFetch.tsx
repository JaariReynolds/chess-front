import { ApiResponse } from "../types/apiResponse";
import { Gameboard } from "../types/gameboard";
import { useFetch } from "./useFetch";

export default function useFenExportFetch<T>(
  gameboard: Gameboard,
  setData: React.Dispatch<React.SetStateAction<ApiResponse<T>>>
) {
  const { fetchNow } = useFetch<T>(
    "http://localhost:7179/api/chess/importFen",
    setData,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameboard),
    },
    false
  );

  return {
    fetchFenExport: fetchNow,
  };
}
