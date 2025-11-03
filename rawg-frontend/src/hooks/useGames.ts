import { useQuery } from "@tanstack/react-query";

import type { GameQuery } from "../App";
import apiClient from "../services/api-client";
import { type Response } from "./useData";

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

const useGames = (gameQuery: GameQuery) =>
  useQuery<Response<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: () =>
      apiClient
        .get<Response<Game>>("/games", {
          params: {
            genres: gameQuery.genre?.id,
            platforms: gameQuery.platform?.id,
            stores: gameQuery.store?.id,
            ordering: gameQuery.sortOrder,
            search: gameQuery.searchText,
          },
        })
        .then((res) => res.data),
  });

export default useGames;
