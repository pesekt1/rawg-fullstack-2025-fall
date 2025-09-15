import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import type { Game } from "../hooks/useGames";

interface Props {
  game: Game;
}

export const GameCard = ({ game }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={game.background_image} alt={game.name} />
      {game.parent_platforms.map((platform) => (
        <Text key={platform.platform.id}>{platform.platform.name}</Text>
      ))}
      <CardBody>
        <Heading fontSize="2xl">{game.name}</Heading>
      </CardBody>
    </Card>
  );
};
