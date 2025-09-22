import useGenres, { type Genre } from "../hooks/useGenres";
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
