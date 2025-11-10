import { useInfiniteQuery } from "@tanstack/react-query";

import type { GameQuery } from "../App";
import { type Response } from "../services/api-client";
import type { Game } from "../services/gameService";
import gameService from "../services/gameService";

const useGames = (gameQuery: GameQuery) => {
  const simpleGameQuery = {
    ...gameQuery,
    genre: gameQuery.genre?.id,
    platform: gameQuery.platform?.id,
    store: gameQuery.store?.id,
  };

  return useInfiniteQuery<Response<Game>, Error>({
    queryKey: ["games", simpleGameQuery],
    queryFn: ({ pageParam = 1 }) =>
      gameService.getAll({
        params: {
          genres: gameQuery.genre?.id,
          platforms: gameQuery.platform?.id,
          stores: gameQuery.store?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
          page_size: gameQuery.pageSize,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });
};

export default useGames;
