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

import useStores, { type Store } from "../hooks/useStores";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  onSelectStore: (store: Store | null) => void;
  selectedStore: Store | null;
}

const StoreList = ({ onSelectStore, selectedStore }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const COLLAPSED_STORE_COUNT = 5;

  const { stores, error, isLoading } = useStores();

  const displayedStores = isExpanded
    ? stores
    : stores.slice(0, COLLAPSED_STORE_COUNT);

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Button variant="link" onClick={() => onSelectStore(null)}>
        <Heading fontSize="2xl" marginBottom={3}>
          Stores
        </Heading>
      </Button>
      <List>
        {displayedStores.map((store) => (
          <ListItem key={store.id} padding="5px">
            <HStack>
              <Image
                src={getCroppedImageUrl(store.image_background)}
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
              />
              <Button
                variant="link"
                fontSize="lg"
                onClick={() => onSelectStore(store)}
                colorScheme={
                  store.id === selectedStore?.id ? "yellow" : undefined
                }
              >
                {store.name}
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

export default StoreList;
