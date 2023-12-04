import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function FilterPlatform() {
  const { platform } = useParams();
  const [platformGames, setPlatformGames] = useState([]);

  useEffect(() => {
    async function getPlatforms() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}platforms?key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const json = await response.json();
      setPlatformGames(json.results);
    }
    getPlatforms();
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
          Platforms
        </button>
        <ul class="dropdown-menu dropdown-menu-dark ">
          {platformGames.map((platform) => (
            <li key={platform.id} value={platform.id}>
              <Link className="dropdown-item" to={`/games/${platform.slug}`}>
                {platform.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FilterPlatform;
