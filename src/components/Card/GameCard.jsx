import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function GameCard({ game }) {
  return (
    <div className="col-12 col-md-6 col-lg-3 my-3">
      <div
        className="card games-card d-flex justify-content-center text-center p-0"
        style={{ height: '360px' }}
      >
        <LazyLoadImage
          className="card-img-top card-img"
          src={game.background_image}
          alt={game.name}
          effect="blur"
        />

        <div className="card-body d-flex justify-content-between align-items-center flex-column">
          <h5 className="card-title mt-1">{game.name}</h5>
          <p className="card-text">
            {game.genres.map((genre) => genre.name).join(', ')}
          </p>

          <Link to={`/game/${game.slug}`}>
            <button className="game-list-button ff-cinzel">
              Scopri di più...
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
