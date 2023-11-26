import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppContext from "./context/AppContext";
import RoutesPage from "./routes/RoutesPage";

function App() {
  const [admin, setAdmin] = useState(true);
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [gamesSearched, setGamesSearched] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(1);

  useEffect(() => {
    async function getGames() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}games?key=${
          import.meta.env.VITE_API_KEY
        }&page=1`
      );
      const parsedResponse = await response.json();
      console.log(parsedResponse.results);
      setGamesSearched(parsedResponse);
    }

    getGames();
  }, [games]);

  return (
    <AppContext.Provider
      value={{
        admin,
        setAdmin,
        games,
        setGames,
        genres,
        setGenres,
        gamesSearched,
        setGamesSearched,
        loading,
        setLoading,
        error,
        setError,
        search,
        setSearch,
        pagination,
        setPagination,
      }}
    >
      {/* //* Il layout copre tutto il sito. Per aggiungere un elemento presente ovunque, inserirlo qui. */}
      {/* //* Tutte le rotte si trovano dentro l'elemento RoutesPage. */}
      <RoutesPage />
    </AppContext.Provider>
  );
}

function Root() {
  return (
    //* Router (o BrowserRouter) racchiude tutto il sito. Serve per poter utilizzare le rotte.
    <Router>
      <App />
    </Router>
  );
}

export default Root;
