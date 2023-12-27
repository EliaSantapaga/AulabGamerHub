import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import PacManLoader from '../../components/Loader/PacManLoader';
import PrestoCard from '../../components/Card/GameCard';
import AppLayout from '../../layout/AppLayout';
import Space from '../../components/Layout/Space';
import LeafDecoration from '../../components/Decorations/LeafDecoration';
import SelectYourGame from '../../components/Pagination/SelectYourGame';

function Genre() {
  const { games, setGames, error, setError, loading, setLoading, pagination } =
    useContext(AppContext);
  const { genre } = useParams();
  const [genreGames, setGenreGames] = useState([]);

  useEffect(() => {
    setError('');
    setLoading(true);

    async function getGenre() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}games?key=${
            import.meta.env.VITE_API_KEY
          }&page=${pagination}&page_size=20&genres=${genre}`
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
  }, [genre, pagination]);

  console.log(pagination);

  return (
    <AppLayout>
      <div className="container">
        <Space />
        <div className="row">
          <div className="col-12 d-flex justify-content-center pt-5 pb-2 overflow-hidden">
            <h1
              className="pb-2 text-center text-white shadow-neon fs-0 ff-cinzel page-title"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor-placement="center-bottom"
            >
              {genre} Games
            </h1>
          </div>
          <LeafDecoration />
        </div>

        <SelectYourGame />

        <div className="row mb-5">
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
