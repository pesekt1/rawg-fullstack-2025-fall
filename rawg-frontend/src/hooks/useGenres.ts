import { useQuery } from "@tanstack/react-query";
import ms from "ms";

import genres from "../data/genres";
import ApiClient, { type Response } from "../services/api-client";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const apiClient = new ApiClient<Genre>("/genres");

const useGenres = () =>
  useQuery<Response<Genre>, Error>({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: ms("24 hours"), // 24 hours
    cacheTime: ms("24 hours"), // 24 hours
    initialData: genres,
  });
export default useGenres;
