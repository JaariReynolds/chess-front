import { ApiResponse } from "../types/apiResponse";
import { FenStringObject } from "../types/dataTransferObjects";
import { useFetch } from "./useFetch";

export default function useFenChessFetch<T>(
  fenString: string,
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
      body: JSON.stringify({ fenString: fenString } as FenStringObject),
    },
    false
  );

  return {
    fetchFenBoard: fetchNow,
  };
}
