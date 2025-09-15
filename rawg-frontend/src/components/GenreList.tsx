import useGenres from "../hooks/useGenres";

const GenreList = () => {
  const { genres, error, isLoading } = useGenres();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {genres.map((genre) => (
        <div key={genre.id}>{genre.name}</div>
      ))}
    </div>
  );
};

export default GenreList;
