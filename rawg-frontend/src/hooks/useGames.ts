import useData from "./useData";

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

const useGames = () => {
  const { data, error, isLoading } = useData<Game>("/games");
  return { games: data, error, isLoading };
};

export default useGames;
