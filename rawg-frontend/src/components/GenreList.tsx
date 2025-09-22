import {
  Button,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";

import useGenres, { type Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ onSelectGenre }: Props) => {
  const { genres, error, isLoading } = useGenres();

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <List>
      {genres.map((genre) => (
        <ListItem key={genre.id} padding="5px">
          <HStack>
            <Image
              src={getCroppedImageUrl(genre.image_background)}
              boxSize="32px"
              borderRadius={8}
              objectFit="cover"
            />
            <Button
              variant="link"
              fontSize="lg"
              onClick={() => onSelectGenre(genre)}
            >
              {genre.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
