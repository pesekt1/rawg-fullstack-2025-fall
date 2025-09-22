import { useState } from "react";

import { Grid, GridItem, Show } from "@chakra-ui/react";

import "./App.css";
import { GameGrid } from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { NavBar } from "./components/NavBar";
import PlatformSelector from "./components/PlatformSelector";
import StoreList from "./components/StoreList";
import type { Platform } from "./hooks/useGames";
import type { Genre } from "./hooks/useGenres";
import type { Store } from "./hooks/useStores";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );

  const handleSelectGenre = (genre: Genre | null) => {
    setSelectedGenre(genre);
  };

  const handleSelectPlatform = (platform: Platform | null) => {
    setSelectedPlatform(platform);
  };

  const handleSelectStore = (store: Store | null) => {
    setSelectedStore(store);
  };

  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <GridItem pl="2" area={"nav"}>
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem pl="2" area={"aside"}>
          <GenreList
            onSelectGenre={handleSelectGenre}
            selectedGenre={selectedGenre}
          />
          <StoreList
            onSelectStore={handleSelectStore}
            selectedStore={selectedStore}
          />
        </GridItem>
      </Show>
      <GridItem pl="2" area={"main"}>
        <PlatformSelector
          onSelectPlatform={handleSelectPlatform}
          selectedPlatform={selectedPlatform}
        />
        <GameGrid
          selectedGenre={selectedGenre}
          selectedPlatform={selectedPlatform}
          selectedStore={selectedStore}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
