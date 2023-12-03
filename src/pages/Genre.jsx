import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import PacManLoader from '../components/Loader/PacManLoader';
import PrestoCard from '../components/Card/PrestoCard';
import AppLayout from '../layout/AppLayout';
import Space from '../components/Space';
import PaginationUp from '../components/PaginationUp';

function Genre() {
  const { games, error, setError, loading, setLoading } =
    useContext(AppContext);
  const { genre } = useParams();
  const [genreGames, setGenreGames] = useState([]);

  useEffect(() => {
    // setError("");
    setLoading(true);

    async function getGenre() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}games?key=${
            import.meta.env.VITE_API_KEY
          }&genres=${genre}`
        );

        if (response.ok) {
          const json = await response.json();
          setGenreGames(json.results);
        } else {
          setError('Ops, riprova la tua chiamata API');
        }

        setLoading(false);
      } catch (error) {
        setError('Ops, pagina non trovata', error.message);
      }
    }
    getGenre();
  }, [genre]);

  // console.log(genre);

  return (
    <AppLayout>
      <div className="container mb-5">
        <div className="row mb-5">
          <Space />
          <div className="col-12 d-flex justify-content-center">
            <h1
              className="pb-2 border-bottom text-center text-white shadow-pink ff-cinzel mt-none mt-4 mb-5"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor-placement="center-bottom"
            >
              {genre} Games
            </h1>
          </div>

          <PaginationUp />

          <div className="col-10 col-md-6 text-center">
            <div>
              <h3 className=" ff-cinzel text-white fs-1 shadow-neon">
                Select your game!
              </h3>
            </div>
          </div>

          <PaginationUp />

          {/* <div className="col-1 col-md-3 d-flex justify-content-start">
      <i
        className="fa-solid fa-chevron-right fs-1 text-light neon cursor-pointer"
        onClick={handlePaginationUp}
      ></i>
    </div> */}
        </div>

        <div className="row">
          {error && (
            <div className="center-flex">
              <div className="col-12 col-lg-6 mb-3 center-flex text-center text-white git-sentence">
                <p className="neon ff-cinzel git">{error}</p>
              </div>
            </div>
          )}
          {loading && <PacManLoader />}

          {genreGames &&
            genreGames.map((game) => <PrestoCard game={game} key={game.id} />)}
        </div>
      </div>
    </AppLayout>
  );
}

export default Genre;
