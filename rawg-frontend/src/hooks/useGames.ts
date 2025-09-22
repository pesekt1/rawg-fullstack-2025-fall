import useData from "./useData";
import type { Genre } from "./useGenres";

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

const useGames = (selectedGenre: Genre | null) => {
  const { data, error, isLoading } = useData<Game>(
    "/games",
    {
      params: {
        genres: selectedGenre?.id,
      },
    },
    [selectedGenre],
  );
  return { games: data, error, isLoading };
};

export default useGames;
