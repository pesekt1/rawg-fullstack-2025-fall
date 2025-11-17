import { useParams } from "react-router-dom";

import { Heading, Spinner } from "@chakra-ui/react";

import GameAttributes from "../components/GameAttributes";
import GameTrailer from "../components/GameTrailer";
import ExpandableText from "../components/reusableComponents/ExpandableText";
import useGame from "../hooks/useGame";

const GameDetailPage = () => {
  const { id } = useParams();

  const { data: game, error, isLoading } = useGame(id!);

  if (isLoading) return <Spinner />;
  if (error || !game) throw error;

  return (
    <>
      <Heading>{game.name}</Heading>
      <ExpandableText>{game.description_raw}</ExpandableText>
      <GameAttributes game={game} />
      <GameTrailer gameId={game.id} />
    </>
  );
};

export default GameDetailPage;
