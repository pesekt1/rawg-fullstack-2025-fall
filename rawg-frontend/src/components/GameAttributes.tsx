import { SimpleGrid, Text } from "@chakra-ui/react";

import type { Game } from "../entities/Game";
import CriticScore from "./CriticScore";
import DefinitionItem from "./DefinitionItem";

interface Props {
  game: Game;
}

const GameAttributes = ({ game }: Props) => {
  return (
    <SimpleGrid as="dl" columns={2} spacing={4} mt={4}>
      <DefinitionItem term="Platforms">
        {game.parent_platforms.map((p) => (
          <Text key={p.platform.id}>{p.platform.name}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Stores">
        {game.stores.map((store) => (
          <Text key={store.id}>{store.name}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Genres">
        {game.genres.map((genre) => (
          <Text key={genre.id}>{genre.name}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Publishers">
        {game.publishers.map((publisher) => (
          <Text key={publisher.id}>{publisher.name}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Score">
        <CriticScore score={game.metacritic} />
      </DefinitionItem>
    </SimpleGrid>
  );
};

export default GameAttributes;
