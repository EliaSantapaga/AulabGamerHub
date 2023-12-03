import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Filter() {
  const { genre } = useParams();
  const [genreGames, setGenreGames] = useState([]);

  useEffect(() => {
    async function getGeners() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}genres?key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const json = await response.json();
      setGenreGames(json.results);
    }
    getGeners();
  }, []);

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={handleGenreChange}
    >
      <option>Genres</option>
      {genreGames.map((genre) => (
        <butto key={genre.id} value={genre.id}>
          <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
        </butto>
      ))}
    </select>
  );
}

export default Filter;
