import { ApiResponse } from "../types/apiResponse";

import { useFetch } from "./useFetch";

export default function useInitialChessFetch<T>(
  setData: React.Dispatch<React.SetStateAction<ApiResponse<T>>>
) {
  const { fetchNow } = useFetch<T>("http://localhost:7179/api/chess/initialState", setData);

  return {
    fetchInitialBoard: fetchNow,
  };
}
