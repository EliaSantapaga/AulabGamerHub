import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/RoutesPage';
import AppContext from './context/AppContext';
import AuthContext from './context/AuthContext';
import useAuth from './hooks/useAuth';

function App() {
  const [admin, setAdmin] = useState(true);
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [gamesSearched, setGamesSearched] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState(1);
  const [game, setGame] = useState([]);
  const data = useAuth();

  useEffect(() => {
    async function getGames() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}games?key=${
          import.meta.env.VITE_API_KEY
        }&page=1`
      );
      const parsedResponse = await response.json();
      setGamesSearched(parsedResponse);
    }
    getGames();
  }, [games]);

  return (
    <AuthContext.Provider value={data}>
      <AppContext.Provider
        value={{
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
          game,
          setGame,
        }}
      >
        <RouterProvider router={router} />
      </AppContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
