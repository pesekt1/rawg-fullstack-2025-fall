import {
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
} from "@chakra-ui/react";

import useDeleteGame from "../hooks/useDeleteGame";
import type { Game } from "../hooks/useGames";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import PlatformIconsList from "./PlatformIconsList";

interface Props {
  game: Game;
}

export const GameCard = ({ game }: Props) => {
  const { mutate, isLoading } = useDeleteGame();

  return (
    <Card>
      <Image src={getCroppedImageUrl(game.background_image)} alt={game.name} />
      <HStack justifyContent="space-between" padding={2}>
        <PlatformIconsList
          platforms={game.parent_platforms.map((p) => p.platform)}
        />
        <CriticScore score={game.metacritic} />
      </HStack>
      <CardBody>
        <Heading fontSize="2xl">{game.name}</Heading>
        <Button
          isLoading={isLoading}
          color="red"
          onClick={() => mutate(game.id)}
        >
          Delete
        </Button>
      </CardBody>
    </Card>
  );
};
