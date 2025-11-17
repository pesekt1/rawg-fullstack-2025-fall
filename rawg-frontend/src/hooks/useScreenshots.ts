import { useQuery } from "@tanstack/react-query";

import type { Screenshot } from "../entities/Screenshot";
import ApiClient from "../services/api-client";

const useScreenshots = (gameId: number) => {
  const apiClient = new ApiClient<Screenshot>(`/games/${gameId}/screenshots`);

  return useQuery({
    queryKey: ["screenshots", gameId],
    queryFn: () => apiClient.getAll(),
  });
};

export default useScreenshots;
