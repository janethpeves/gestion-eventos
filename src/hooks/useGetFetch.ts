/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "@/connections";
import { url } from "@/connections/mainApi";

interface UseGetFetchOptions {
  headers?: Record<string, any>;
  params?: Record<string, any>;
}

interface UseGetFetchResult {
  data: any;
  isLoading: boolean;
  error: any;
  reloadFetchData: (newEndpoint?: string) => Promise<void>;
}

export const useGetFetch = (
  endpoint: string,
  options?: UseGetFetchOptions,
): UseGetFetchResult => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async (newEndpoint?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!endpoint || typeof endpoint !== "string") {
        throw new Error(`Error: endpoint inválido (${endpoint})`);
      }

      const fullUrl = `${url.replace(/\/$/, "")}/${(
        newEndpoint ?? endpoint
      ).replace(/^\//, "")}`;

      const response = await api.get(fullUrl, {
        headers: options?.headers,
        params: options?.params,
      });

      setData(response.data);
    } catch (err) {
      setError(err);
      console.error("❌ Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const reloadFetchData = async (newEndpoint?: string) => {
    await fetchData(newEndpoint);
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);
  return {
    data,
    isLoading,
    error,
    reloadFetchData,
  };
};
