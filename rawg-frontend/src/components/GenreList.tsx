import { useState } from "react";

import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";

import useGenres, { type Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre | null) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const COLLAPSED_GENRE_COUNT = 5;

  const { genres, error, isLoading } = useGenres();

  const displayedGenres = isExpanded
    ? genres
    : genres.slice(0, COLLAPSED_GENRE_COUNT);

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Button variant="link" onClick={() => onSelectGenre(null)}>
        <Heading fontSize="2xl" marginBottom={3}>
          Genres
        </Heading>
      </Button>
      <List>
        {displayedGenres.map((genre) => (
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
                colorScheme={
                  genre.id === selectedGenre?.id ? "yellow" : undefined
                }
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
        <Button onClick={() => setIsExpanded(!isExpanded)} marginY={5}>
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      </List>
    </>
  );
};

export default GenreList;
