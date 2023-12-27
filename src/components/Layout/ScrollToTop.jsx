import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Quando la posizione (path) cambia, scorri la pagina in cima
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null; // render vuoto, poiché questo componente non ha alcuna rappresentazione visuale
}

export default ScrollToTop;
