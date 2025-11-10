import useGenres from "../hooks/useGenres";
import useGameQueryStore from "../store";
import CustomList from "./reusableComponents/CustomList";

const selectedGenre = useGameQueryStore((s) => s.gameQuery.genre);
const setGenre = useGameQueryStore((s) => s.setGenre);

const GenreList = () => {
  return (
    <CustomList
      onSelectItem={setGenre}
      selectedItem={selectedGenre}
      title="Genres"
      useDataHook={useGenres}
    />
  );
};

export default GenreList;
