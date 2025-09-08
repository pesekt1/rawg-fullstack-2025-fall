import { Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";

export const GameGrid = () => {
  const { games, error } = useGames();

  return (
    <div>
      {error && <Text color="red.500">{error}</Text>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};
