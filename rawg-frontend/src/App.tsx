import { useState } from "react";

import { Grid, GridItem, Show } from "@chakra-ui/react";

import "./App.css";
import { GameGrid } from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { NavBar } from "./components/NavBar";
import type { Genre } from "./hooks/useGenres";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  const handleSelectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
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
          <GenreList onSelectGenre={handleSelectGenre} />
        </GridItem>
      </Show>
      <GridItem pl="2" area={"main"}>
        <GameGrid selectedGenre={selectedGenre} />
      </GridItem>
    </Grid>
  );
}

export default App;
