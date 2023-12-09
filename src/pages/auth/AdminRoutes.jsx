import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

function AdminRoutes() {
  const { admin } = useContext(AppContext);

  //* Se admin è true: ritorna protected routes. Outlet permette di accedere ai figli del componente padre, in questo caso AdminRoutes
  if (admin) return <Outlet />;

  //* Se admin è false: ritorna sulla pagina di login. Navigate serve per reindirizzare al caricamento. In questo caso, stiamo cercando di accedere a una rotta protetta, quindi se non siamo loggati, verremo reindirizzati alla pagina di login.
  return <Navigate to="/login" replace={true} />;
}

export default AdminRoutes;
