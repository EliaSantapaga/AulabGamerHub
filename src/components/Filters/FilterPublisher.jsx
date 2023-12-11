import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function FilterPublisher() {
  const { publisher } = useParams();
  const [publisherGames, setPublisherGames] = useState([]);

  useEffect(() => {
    async function getPublishers() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}publishers?key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const json = await response.json();
      setPublisherGames(json.results);
    }
    getPublishers();
  }, []);

  return (
    <div className="col-6 col-md-2 d-flex justify-content-center">
      <div className="dropdown">
        <button
          className="game-list-button dropdown-toggle "
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Publishers
        </button>
        <ul className="dropdown-menu dropdown-menu-dark ">
          {publisherGames.map((publisher) => (
            <li key={publisher.id} value={publisher.id}>
              <Link className="dropdown-item" to={`/games/publishers/${publisher.slug}`}>
                {publisher.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FilterPublisher;
