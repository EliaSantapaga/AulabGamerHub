import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import PrestoCard from "../components/Card/PrestoCard";
import PacManLoader from "../components/Loader/PacManLoader";
import Space from "../components/Space";
import AppLayout from "../layout/AppLayout";

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
    setPagination,
  } = useContext(AppContext);

  const handleSearch = (event) => {
    setSearch(event.currentTarget.value);
  };

  const handlePaginationUp = () => {
    setPagination((prevPagination) => prevPagination + 1);
  };

  const handlePaginationDown = () => {
    if (pagination !== 1) {
      setPagination((prevPagination) => prevPagination - 1);
    }
  };

  useEffect(() => {
    setGames([]);
    setError("");
    setLoading(true);

    const timeoutApi = setTimeout(() => {
      async function fetchData() {
        console.log("Calling API", search);

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
            setError("Ops, riprova la tua chiamata API");
          }
        } catch (error) {
          setError("Ops, pagina non trovata", error.message);
        }

        setLoading(false);
      }

      fetchData();
    }, 1500);

    return () => {
      clearTimeout(timeoutApi);
    };

    //! SEARCH è UNA PROPRIETA' DELLO STATO: SE CAMBIA SEARCH, RILANCIA LA FUNZIONE DENTRO useEffect!!!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pagination]);

  return (
    <AppLayout>
      <div className="container mb-5">
        <div className="row mb-5">
            <Space />
          <div className="col-12 d-flex justify-content-center">
            <h1
              className="pb-2 border-bottom text-center text-white shadow-pink ff-orbitron mt-none mt-4 mb-5"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor-placement="center-bottom"
            >
              Game List
            </h1>
          </div>
          <div className="col-1 col-md-3 d-flex justify-content-end">
            <i
              className={`fa-solid fa-chevron-left fs-1  ${
                pagination === 1
                  ? "cursor-default text-grey"
                  : "cursor-pointer text-light neon"
              }`}
              onClick={() => handlePaginationDown(pagination)}
            ></i>
          </div>

          <div className="col-10 col-md-6">
            <div>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2 rounded-pill text-center"
                  type="search"
                  id="search"
                  placeholder="Cerca il tuo gioco..."
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </form>
            </div>
          </div>
          <div className="col-1 col-md-3 d-flex justify-content-start">
            <i
              className="fa-solid fa-chevron-right fs-1 text-light neon cursor-pointer"
              onClick={handlePaginationUp}
            ></i>
          </div>
        </div>

        <div className="row">
          {/* //todo - Mostra i dati nell'interfaccia - */}

          {error && (
            <div className="center-flex">
              <div className="col-12 col-lg-6 mb-3 center-flex text-center text-white git-sentence">
                <p className="neon ff-orbitron git">{error}</p>
              </div>
            </div>
          )}
          {loading && <PacManLoader />}

          {games &&
            games.map((game) => <PrestoCard game={game} key={game.id} />)}
        </div>
      </div>
    </AppLayout>
  );
}

export default GameList;
