import { Link } from "react-router-dom";

// import AppContext from "../context/AppContext";

function PrestoCard({ game }) {
  // const { game } = useContext(AppContext);

  return (
    <div className="col-12 col-md-6 col-lg-3 my-3">
      <div
        className="card d-flex justify-content-center text-center card-annunci"
        style={{ height: "370px" }}
      >
        <img
          src={game.background_image}
          className="card-img-top card-img"
          alt={game.name}
        />

        <div className="card-body d-flex justify-content-between align-items-center flex-column">
          <h5 className="card-title">{game.name}</h5>
          <p className="card-text">
            {game.genres.map((genre) => genre.name).join(", ")}
          </p>

          <Link className="decoration-none" to={`/game/${game.slug}`}>
            <a
              href=""
              className="cardbutton btn btn-prezzo ff-orbitron d-flex align-items-center justify-content-center text-white linkCard decoration-none"
              target="_blank"
            >
              Scopri di più...
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PrestoCard;
