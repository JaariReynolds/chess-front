import { useCallback, useEffect, useState } from "react";
import { ApiResponse } from "../types/apiResponse";

export function useFetch<T>(
  url: string,
  setData: React.Dispatch<React.SetStateAction<ApiResponse<T>>>,
  options?: RequestInit,
  fetchOnMount: boolean = true
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const abortController = new AbortController();

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url, { ...options, signal: abortController.signal });

      if (!response.ok) {
        throw new Error(`Rquest failed with status: ${response.status}`);
      }

      const result: ApiResponse<T> = await response.json();
      setData(result);
    } catch (error) {
      const typedError = error as Error;
      const errorResult: ApiResponse<T> = { success: false, data: null, error: typedError.message };
      setData(errorResult);
    } finally {
      setIsLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (fetchOnMount) fetchData();
  }, [fetchOnMount]);

  return { isLoading, fetchNow: fetchData };
}
