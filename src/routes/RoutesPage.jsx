import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import Dashboard from '../pages/Dashboard';
import AdminRoutes from '../pages/auth/AdminRoutes';
import RouteNotFound from '../pages/RouteNotFound';
import GameList from '../pages/GameList';
import Register from '../pages/Register';
import GameDetail from '../pages/GameDetail';
import AccountProfile from '../pages/AccountProfile';
import LoggedUserRoutes from '../pages/auth/LoggedUserRoutes';
import Genre from '../pages/Genre';
import AccountSettings from '../pages/AccountSettings';

function RoutesPage() {
  return (
    <Routes>
      {/* //* Ogni rotta corrisponde a una pagina creata nella cartella pages e importata */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/games" element={<GameList />} />
      <Route path="/games/:genre" element={<Genre />} />
      <Route path="/game/:game_slug" element={<GameDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* //* Per creare delle rotte parametriche devo inserire nell'URL "/:nomeparametro" */}
      {/* //* La proprietà lazy="" permette di rallentare il caricamento della rotta chiamata */}
      {/* //todo <Route path="/game/:id" lazy="/game/:id" element={<DetailGame />} /> */}

      {/* //* Questa rotta conterrà tutte le rotte protette (accessibili se l'utente è loggato) */}
      <Route element={<AdminRoutes />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<LoggedUserRoutes />}>
        <Route path="/profile" element={<AccountProfile />} />
        <Route path="/settings" element={<AccountSettings />} />
      </Route>

      {/* //* Rotta per l'errore 404 - Page not found. Se la rotta non esiste, viene visualizzata questa pagina */}
      <Route path="*" element={<RouteNotFound />} />
    </Routes>
  );
}

export default RoutesPage;
