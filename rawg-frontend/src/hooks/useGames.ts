import useData from "./useData";
import type { Genre } from "./useGenres";
import type { Store } from "./useStores";

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

const useGames = (
  selectedGenre: Genre | null,
  selectedPlatform: Platform | null,
  selectedStore: Store | null,
) => {
  const { data, error, isLoading } = useData<Game>(
    "/games",
    {
      params: {
        genres: selectedGenre?.id,
        platforms: selectedPlatform?.id,
        stores: selectedStore?.id,
      },
    },
    [selectedGenre, selectedPlatform, selectedStore],
  );
  return { games: data, error, isLoading };
};

export default useGames;
