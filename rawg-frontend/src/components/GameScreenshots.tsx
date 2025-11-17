import { SimpleGrid, Spinner } from "@chakra-ui/react";

import useScreenshots from "../hooks/useScreenshots";

interface Props {
  gameId: number;
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data, error, isLoading } = useScreenshots(gameId);

  if (isLoading) return <Spinner />;

  if (error) throw error;

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
      {data?.results.map((screenshot) => (
        <img
          key={screenshot.id}
          src={screenshot.image}
          alt={`Screenshot ${screenshot.id}`}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      ))}
    </SimpleGrid>
  );
};

export default GameScreenshots;
