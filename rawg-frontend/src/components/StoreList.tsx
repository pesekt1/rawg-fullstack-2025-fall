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
  const { stores, error, isLoading } = useStores();

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
        {stores.map((store) => (
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
      </List>
    </>
  );
};

export default StoreList;
