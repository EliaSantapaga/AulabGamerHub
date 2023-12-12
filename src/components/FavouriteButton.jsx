import { useContext, useEffect, useState } from 'react';
import supabase from '../supabase/client';
import AppContext from '../context/AppContext';
import AuthContext from '../context/AuthContext';

export async function getSingleGame({ params }) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}games/${params.slug}?key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const json = await response.json();
  return json;
}

function FavouriteButton({ game }) {
  const { session } = useContext(AuthContext);
  const [fav, setFav] = useState([]);
  const [hovered, setHovered] = useState(false);

  console.log(fav);
  console.log(game);

  const getFavGame = async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('game_id', game.id)
      .eq('profile_id', session.user.id);
    if (error) {
      alert(error.message);
    } else {
      setFav(() => [...data]);
    }
  };

  const addToFavorites = async () => {
    const { error } = await supabase
      .from('favorites')
      .insert([
        {
          game_id: game.id,
          game_name: game.name,
        },
      ])
      .select();
    if (error) {
      alert(error.message);
    } else {
      getFavGame();
    }
  };

  const removeFromFavorites = async () => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('game_id', game.id)
      .eq('profile_id', session.user.id);
    if (error) {
      alert(error.message);
    } else {
      getFavGame();
    }
  };

  useEffect(() => {
    if (session) {
      getFavGame();
    }
  }, []);

  return (
    <div className="fav-container">
      {fav.length !== 0 ? (
        <button
          className="icon d-flex justify-content-center align-items-center border rounded-pill"
          type="button"
          onClick={removeFromFavorites}
        >
          <i
            className={`fa-solid text-danger fav-icon fs-3 ${
              hovered ? 'fa-heart-crack' : 'fa-heart'
            }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
        </button>
      ) : (
        <button
          className="icon d-flex justify-content-center align-items-center border rounded-pill"
          type="button"
          onClick={addToFavorites}
        >
          <i
            className={`fa-heart text-danger fav-icon fs-3 ${
              hovered ? 'fa-solid' : 'fa-regular'
            }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
        </button>
      )}
    </div>
  );
}

export default FavouriteButton;
