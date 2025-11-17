import { useParams } from "react-router-dom";

import { Heading, Spinner } from "@chakra-ui/react";

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
    </>
  );
};

export default GameDetailPage;
