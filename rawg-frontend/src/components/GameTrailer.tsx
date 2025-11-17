import { Spinner } from "@chakra-ui/react";

import useTrailers from "../hooks/useTrailers";

interface Props {
  gameId: number;
}

const GameTrailer = ({ gameId }: Props) => {
  const { data, error, isLoading } = useTrailers(gameId);

  if (isLoading) return <Spinner />;

  if (error) throw error;

  const firstTrailer = data?.results[0];

  if (!firstTrailer) null;

  return (
    <video
      src={firstTrailer?.dataMax}
      poster={firstTrailer?.preview}
      controls
    />
  );
};

export default GameTrailer;
