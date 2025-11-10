import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";

import "./App.css";
import { GameGrid } from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { NavBar } from "./components/NavBar";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import StoreList from "./components/StoreList";

function App() {
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
          <GenreList />
          <StoreList />
        </GridItem>
      </Show>
      <GridItem pl="2" area={"main"}>
        <HStack spacing={5} marginBottom={5} paddingLeft={2}>
          <PlatformSelector />
          <SortSelector />
        </HStack>
        <GameGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
