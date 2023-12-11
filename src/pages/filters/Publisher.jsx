import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import PacManLoader from '../../components/Loader/PacManLoader';
import PrestoCard from '../../components/Card/GameCard';
import AppLayout from '../../layout/AppLayout';
import Space from '../../components/Space';
import LeafDecoration from '../../components/Decorations/LeafDecoration';
import SelectYourGame from '../../components/Pagination/SelectYourGame';

function Publisher() {
  const { games, error, setError, loading, setLoading, pagination } =
    useContext(AppContext);
  const { publisher } = useParams();
  const [publisherGames, setPublisherGames] = useState([]);

  useEffect(() => {
    setError('');
    setLoading(true);

    async function getPublisher() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}games?key=${
            import.meta.env.VITE_API_KEY
          }&page=${pagination}&publishers=${publisher}`
        );

        if (response.ok) {
          const json = await response.json();
          setPublisherGames(json.results);
        } else {
          setError('Ops, riprova la tua chiamata API');
        }

        setLoading(false);
      } catch (error) {
        setError('Ops, pagina non trovata', error.message);
      }
    }
    getPublisher();
  }, [publisher, pagination]);

  console.log(pagination);

  return (
    <AppLayout>
      <div className="container px-3">
        <Space />
        <div className="row my-md-5 my-4">
          <div className="col-12 d-flex justify-content-center">
            <h1
              className="pb-2 text-center text-white shadow-neon fs-0 ff-cinzel text-capitalize"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor-placement="center-bottom"
            >
              {publisher} Games
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

          {publisherGames &&
            publisherGames.map((game) => (
              <PrestoCard game={game} key={game.id} />
            ))}
        </div>
      </div>
    </AppLayout>
  );
}

export default Publisher;
