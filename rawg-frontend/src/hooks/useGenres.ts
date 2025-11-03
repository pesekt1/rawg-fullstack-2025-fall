import { useQuery } from "@tanstack/react-query";

import genres from "../data/genres";
import apiClient, { type Response } from "../services/api-client";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () =>
  useQuery<Response<Genre>, Error>({
    queryKey: ["genres"],
    queryFn: () =>
      apiClient.get<Response<Genre>>("/genres").then((res) => res.data),
    staleTime: 1000 * 5, // 24 hours
    initialData: genres,
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
export default useGenres;
