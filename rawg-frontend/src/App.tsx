import { useState } from "react";

import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";

import "./App.css";
import { GameGrid } from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { NavBar } from "./components/NavBar";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import StoreList from "./components/StoreList";
import type { Platform } from "./hooks/useGames";
import type { Genre } from "./hooks/useGenres";
import type { Store } from "./hooks/useStores";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  store: Store | null;
  sortOrder: string | null;
  searchText: string | null;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  const handleSelectGenre = (genre: Genre | null) => {
    setGameQuery((prev) => ({ ...prev, genre }));
  };

  const handleSelectPlatform = (platform: Platform | null) => {
    setGameQuery((prev) => ({ ...prev, platform }));
  };

  const handleSelectStore = (store: Store | null) => {
    setGameQuery((prev) => ({ ...prev, store }));
  };

  const handleSelectSortOrder = (sortOrder: string | null) => {
    setGameQuery((prev) => ({ ...prev, sortOrder }));
  };

  const handleSearch = (searchText: string | null) => {
    setGameQuery((prev) => ({ ...prev, searchText }));
  };

  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <GridItem pl="2" area={"nav"}>
        <NavBar onSearch={handleSearch} />
      </GridItem>
      <Show above="lg">
        <GridItem pl="2" area={"aside"}>
          <GenreList
            onSelectGenre={handleSelectGenre}
            selectedGenre={gameQuery.genre}
          />
          <StoreList
            onSelectStore={handleSelectStore}
            selectedStore={gameQuery.store}
          />
        </GridItem>
      </Show>
      <GridItem pl="2" area={"main"}>
        <HStack spacing={5} marginBottom={5} paddingLeft={2}>
          <PlatformSelector
            onSelectPlatform={handleSelectPlatform}
            selectedPlatform={gameQuery.platform}
          />
          <SortSelector
            onSelectSortOrder={handleSelectSortOrder}
            sortOrder={gameQuery.sortOrder}
          />
        </HStack>
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
