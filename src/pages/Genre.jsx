import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import PacManLoader from "../components/Loader/PacManLoader";
import PrestoCard from "../components/Card/PrestoCard";

function Genre() {
  const { genres, setGenres, loading, setLoading } = useContext(AppContext);
  const { genre } = useParams();

  useEffect(() => {
    setLoading(true);

    async function getGenre() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}games?key=${
          import.meta.env.VITE_API_KEY
        }&genres=${genre}`
      );
      const json = await response.json();
      setGenres(json.results);
    }

    setLoading(false);
    getGenre();
  }),
    [genre];

  return (
    <div className="container my-5">
      <div className="row mt-5 mb-5">
        <div className="col-12 d-flex justify-content-center mt-5">
          <h1
            className="pb-2 border-bottom text-center text-white shadow-pink ff-cinzel mt-none mt-md-5"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-anchor-placement="center-bottom"
          >
            {genre} Games
          </h1>
        </div>
      </div>

      <div className="row">
        {loading && <PacManLoader />}

        {genres &&
          genres.map((game) => <PrestoCard game={game} key={game.id} />)}
      </div>
    </div>
  );
}

export default Genre;
