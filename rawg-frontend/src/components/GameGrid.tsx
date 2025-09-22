import { SimpleGrid, Text } from "@chakra-ui/react";

import useGames, { type Platform } from "../hooks/useGames";
import type { Genre } from "../hooks/useGenres";
import type { Store } from "../hooks/useStores";
import { GameCard } from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

interface Props {
  selectedGenre: Genre | null;
  selectedPlatform: Platform | null;
  selectedStore: Store | null;
}

export const GameGrid = ({
  selectedGenre,
  selectedPlatform,
  selectedStore,
}: Props) => {
  const { games, error, isLoading } = useGames(
    selectedGenre,
    selectedPlatform,
    selectedStore,
  );

  const skeletons = [...Array(10).keys()];

  return (
    <div>
      {error && <Text color="red.500">{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={4}
        padding={2}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {games.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </div>
  );
};
