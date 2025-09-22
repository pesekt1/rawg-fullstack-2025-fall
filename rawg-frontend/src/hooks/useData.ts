import { useEffect, useState } from "react";

import { type AxiosRequestConfig, CanceledError } from "axios";

import apiClient from "../services/api-client";

interface Response<T> {
  count: number;
  results: T[];
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  dependencies?: any[],
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setIsLoading(true);
      apiClient
        .get<Response<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          setData(res.data.results);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          console.log(err);
          setIsLoading(false);
        });
      return () => controller.abort();
    },
    dependencies ? [...dependencies] : [],
  );

  return { data, error, isLoading };
};

export default useData;
