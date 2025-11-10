import useGenres from "../hooks/useGenres";
import { type Genre } from "../services/genreService";
import CustomList from "./reusableComponents/CustomList";

interface Props {
  onSelectGenre: (genre: Genre | null) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  return (
    <CustomList
      onSelectItem={onSelectGenre}
      selectedItem={selectedGenre}
      title="Genres"
      useDataHook={useGenres}
    />
  );
};

export default GenreList;
