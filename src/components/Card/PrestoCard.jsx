import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// import AppContext from "../context/AppContext";

function PrestoCard({ game }) {
  // const { game } = useContext(AppContext);

  return (
    <div className="col-12 col-md-6 col-lg-3 my-3">
      <div
        className="card d-flex justify-content-center text-center card-annunci"
        style={{ height: "370px" }}
      >
        <LazyLoadImage
          className="card-img-top card-img"
          src={game.background_image}
          alt={game.name}
          effect="blur"
        />

        <div className="card-body d-flex justify-content-between align-items-center flex-column">
          <h5 className="card-title">{game.name}</h5>
          <p className="card-text">
            {game.genres.map((genre) => genre.name).join(", ")}
          </p>

          <Link to={`/game/${game.slug}`}>
            <button className="game-list-button ff-cinzel">Scopri di più...</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PrestoCard;
