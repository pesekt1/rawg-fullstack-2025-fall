import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
} from "@chakra-ui/react";

import type Game from "../entities/Game";
import useDeleteGame from "../hooks/useDeleteGame";
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
        <Heading fontSize="2xl">
          <Link to={`/games/${game.id}`}>{game.name}</Link>
        </Heading>
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
