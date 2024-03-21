import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import PrestoCard from '../components/Card/GameCard';
import PacManLoader from '../components/Loader/PacManLoader';
import Space from '../components/Layout/Space';
import AppLayout from '../layout/AppLayout';
import FilterGenre from '../components/Filters/FilterGenre';
import PaginationUp from '../components/Pagination/PaginationUp';
import LeafDecoration from '../components/Decorations/LeafDecoration';
import PaginationDown from '../components/Pagination/PaginationDown';
import Filters from '../components/Filters/Filters';

function GameList() {
  const {
    games,
    setGames,
    error,
    setError,
    search,
    setSearch,
    loading,
    setLoading,
    pagination,
  } = useContext(AppContext);

  const handleSearch = (event) => {
    setSearch(event.currentTarget.value);
  };

  useEffect(() => {
    setGames([]);
    setError('');
    setLoading(true);

    const timeoutApi = setTimeout(() => {
      async function fetchData() {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}games?key=${
              import.meta.env.VITE_API_KEY
            }&page=${pagination}&page_size=20&search=${search}`
          );

          if (response.ok) {
            const json = await response.json();
            setGames(json.results);
          } else {
            setError('Ops, riprova la tua chiamata API');
          }
        } catch (error) {
          setError('Ops, pagina non trovata', error.message);
        }

        setLoading(false);
      }

      fetchData();
    }, 1500);

    return () => {
      clearTimeout(timeoutApi);
    };

    //! SEARCH è UNA PROPRIETA' DELLO STATO: SE CAMBIA SEARCH, RILANCIA LA FUNZIONE DENTRO useEffect!!!
  }, [search, pagination]);

  useEffect(() => {
    return setSearch('');
  }, []);

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
              Game List
            </h1>
          </div>
          <LeafDecoration />
        </div>

        {/*//* FILTERS  */}
        <div className="row my-3 my-lg-4 d-flex justify-content-center">
          <Filters />
        </div>

        <div className="row mb-3 search-pagination">
          <PaginationDown />
          <div className="col-10 col-md-6">
            <div>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2 rounded-pill text-center"
                  type="search"
                  id="search"
                  placeholder="Search your game..."
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </form>
            </div>
          </div>
          <PaginationUp />
        </div>

        <div className="row mb-3">
          {/* //* Mostra i dati nell'interfaccia */}
          {error && (
            <div className="center-flex">
              <div className="col-12 col-lg-6 mb-3 center-flex text-center text-white git-sentence">
                <p className="neon ff-cinzel git">{error}</p>
              </div>
            </div>
          )}
          {loading && <PacManLoader />}

          {games &&
            games.map((game) => <PrestoCard game={game} key={game.id} />)}
        </div>

        <div className="row mb-5 search-pagination">
          <PaginationDown />
          <div className="col-10 col-md-6">
            <div>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2 rounded-pill text-center"
                  type="search"
                  id="search"
                  placeholder="Search your game..."
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </form>
            </div>
          </div>
          <PaginationUp />
        </div>
      </div>
    </AppLayout>
  );
}

export default GameList;
