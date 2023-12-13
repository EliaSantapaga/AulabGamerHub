import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Root from "../pages/Root";
//* GAMES ROUTES -----------------------
import GameList from '../pages/GameList';
import GameDetail, { getSingleGame } from '../pages/GameDetail';
//* AUTH ROUTES ------------------------
import LoggedUserRoutes from '../pages/auth/LoggedUserRoutes';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AccountProfile from '../pages/auth/AccountProfile';
import AccountSettings from '../pages/auth/AccountSettings';
//* FILTER ROUTES ----------------------
import Genre from '../pages/filters/Genre';
import Developer from '../pages/filters/Developer';
import Publisher from '../pages/filters/Publisher';
import Platform from '../pages/filters/Platform';
import Store from '../pages/filters/Store';
//* REVIEW ROUTE -----------------------
import CommentPage from '../pages/CommentPage';
//* 404 ROUTE --------------------------
import RouteNotFound from '../pages/RouteNotFound';

const router = createBrowserRouter([
  //* Ogni rotta corrisponde a una pagina creata nella cartella pages e importata
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      //* GAMES ROUTES -----------------------
      {
        path: '/games',
        element: <GameList />,
      },
      {
        path: '/game/:id',
        element: <GameDetail />,
        loader: getSingleGame,
      },

      //* AUTH ROUTES ------------------------
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },

      //* Questa rotta conterrà tutte le rotte protette (accessibili se l'utente è loggato)
      {
        path: '/',
        element: <LoggedUserRoutes />,
        children: [
          {
            path: '/profile',
            element: <AccountProfile />,
          },
          {
            path: '/settings',
            element: <AccountSettings />,
          },
        ],
      },

      //* FILTER ROUTES ----------------------
      //* Per creare delle rotte parametriche bisogna inserire nell'URL "/:nomeparametro"
      {
        path: '/games/genres/:genre',
        element: <Genre />,
        // loader: preLoadFilters,
      },
      {
        path: '/games/platforms/:platform',
        element: <Platform />,
      },
      {
        path: '/games/developers/:developer',
        element: <Developer />,
      },
      {
        path: '/games/publishers/:publisher',
        element: <Publisher />,
      },
      {
        path: '/games/stores/:store',
        element: <Store />,
      },

      //* REVIEW ROUTE ----------------------
      //* Rotta per l'errore 404 - Page not found. Se la rotta non esiste, viene visualizzata questa pagina
      {
        path: '/game/:id/review',
        element: <CommentPage />,
        loader: getSingleGame,
      },

      //* 404 ROUTE -------------------------
      {
        path: '*',
        element: <RouteNotFound />,
      },
    ],
  },
]);

export default router;
