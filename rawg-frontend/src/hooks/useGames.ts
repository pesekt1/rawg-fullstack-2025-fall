import { useQuery } from "@tanstack/react-query";

import type { GameQuery } from "../App";
import ApiClient, { type Response } from "../services/api-client";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  metacritic: number;
  parent_platforms: { platform: Platform }[];
}

const apiClient = new ApiClient<Game>("/games");

const useGames = (gameQuery: GameQuery) => {
  const axiosConfig = {
    params: {
      genres: gameQuery.genre?.id,
      platforms: gameQuery.platform?.id,
      stores: gameQuery.store?.id,
      ordering: gameQuery.sortOrder,
      search: gameQuery.searchText,
    },
  };

  return useQuery<Response<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: () => apiClient.getAll(axiosConfig),
  });
};

export default useGames;
