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

import getCroppedImageUrl from "../../services/image-url";

interface Item {
  id: number;
  name: string;
  image_background: string;
}

interface Props<T> {
  onSelectItem: (item: T | null) => void;
  selectedItem: T | null;
  title: string;
  useDataHook: () => {
    data: T[];
    error: string;
    isLoading: boolean;
  };
}

const CustomList = <T extends Item>({
  onSelectItem,
  selectedItem,
  title,
  useDataHook,
}: Props<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const COLLAPSED_GENRE_COUNT = 5;

  const { data: items, error, isLoading } = useDataHook();

  const displayedItems = isExpanded
    ? items
    : items.slice(0, COLLAPSED_GENRE_COUNT);

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Button variant="link" onClick={() => onSelectItem(null)}>
        <Heading fontSize="2xl" marginBottom={3}>
          {title}
        </Heading>
      </Button>
      <List>
        {displayedItems.map((item) => (
          <ListItem key={item.id} padding="5px">
            <HStack>
              <Image
                src={getCroppedImageUrl(item.image_background)}
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
              />
              <Button
                variant="link"
                fontSize="lg"
                onClick={() => onSelectItem(item)}
                colorScheme={
                  item.id === selectedItem?.id ? "yellow" : undefined
                }
              >
                {item.name}
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

export default CustomList;
