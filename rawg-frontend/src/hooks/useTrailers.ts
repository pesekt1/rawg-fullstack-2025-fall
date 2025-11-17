import { useQuery } from "@tanstack/react-query";

import type Trailer from "../entities/Trailer";
import ApiClient from "../services/api-client";

const useTrailers = (gameId: number) => {
  const apiClient = new ApiClient<Trailer>(`/games/${gameId}/movies`);

  return useQuery({
    queryKey: ["trailers", gameId],
    queryFn: () => apiClient.getAll(),
  });
};

export default useTrailers;
