import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';

function FilterGenre() {
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
    <div className="col-6 col-md-2 d-flex justify-content-center">
      <div class="dropdown">
        <button
          class="game-list-button dropdown-toggle "
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Genres
        </button>
        <ul class="dropdown-menu dropdown-menu-dark ">
          {genreGames.map((genre) => (
            <li key={genre.id} value={genre.id}>
              <Link className="dropdown-item" to={`/games/${genre.slug}`}>
                {genre.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FilterGenre;
