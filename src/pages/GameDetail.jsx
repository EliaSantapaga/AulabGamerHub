import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameDetailLayout from '../layout/GameDetailLayout';
import Space from '../components/Space';
import Messages from '../components/LiveChat/Messages';
import supabase from '../supabase/client';
import LeafDecoration from '../components/Decorations/LeafDecoration';
import useProfile from '../hooks/useProfile';
import CarouselTest from '../components/CarouselTest';
import AppContext from '../context/AppContext';

export async function getSingleGame({ params }) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}games/${params.slug}?key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const json = await response.json();
  return json;
}

function GameDetail() {
  const { profile } = useProfile();
  const { game, setGame } = useContext(AppContext);
  const [fav, setFav] = useState([]);

  console.log(profile);

  //* Il params presente qui sopra è possibile destrutturarlo con ciò che ci serve, ovvero il game_slug
  const { game_slug } = useParams();

  //* MESSAGES -------------------------------------
  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const inputForm = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputForm));
    if (typeof message === 'string' && message.trim().length !== 0) {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            profile_id: profile.id,
            game_slug: game.slug,
            content: message,
          },
        ])
        .select();
      if (error) {
        alert(error.message);
      } else {
        inputForm.reset();
      }
    }
  };

  //* FAVORITES -------------------------------------
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

  //* GET GAMES ------------------------------------
  useEffect(() => {
    async function getSingleGame() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}games/${game_slug}?key=${
          import.meta.env.VITE_API_KEY
        }&page=1`
      );
      const json = await response.json();
      setGame(json);
    }
    getSingleGame();
  }, []);

  return (
    <GameDetailLayout>
      <div className="container mb-5">
        <div className="row mb-5">
          <Space />
          <div className="col-12 d-flex justify-content-center">
            <h1
              className="pb-2 text-center text-white shadow-neon ff-cinzel mt-none mt-5 fs-0"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor-placement="center-bottom"
            >
              {game.name}
            </h1>
          </div>
          <div className="col-12">
            <LeafDecoration />
          </div>

          <div className="row my-5 m-0">
            <div className="col-12 col-md-6">
              <h2 className="shadow-neon text-center fs-1 mb-3 mt-5 mt-lg-0">
                Game Details
              </h2>
              <img
                className="img-article rounded"
                src={game.background_image}
                alt=""
              />

              {/*//* FAVOURITES BUTTON ----------------- */}

              <div>
                <input type="checkbox" id="checkbox" />
                <label for="checkbox">
                  <svg
                    id="heart-svg"
                    viewBox="467 392 58 57"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      id="Group"
                      fill="none"
                      fill-rule="evenodd"
                      transform="translate(467 392)"
                    >
                      <path
                        d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                        id="heart"
                        fill="#AAB8C2"
                      />
                      <circle
                        id="main-circ"
                        fill="#E2264D"
                        opacity="0"
                        cx="29.5"
                        cy="29.5"
                        r="1.5"
                      />

                      <g id="grp7" opacity="0" transform="translate(7 6)">
                        <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                        <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                      </g>

                      <g id="grp6" opacity="0" transform="translate(0 28)">
                        <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                        <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                      </g>

                      <g id="grp3" opacity="0" transform="translate(52 28)">
                        <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                        <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                      </g>

                      <g id="grp2" opacity="0" transform="translate(44 6)">
                        <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                        <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                      </g>

                      <g id="grp5" opacity="0" transform="translate(14 50)">
                        <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                        <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                      </g>

                      <g id="grp4" opacity="0" transform="translate(35 50)">
                        <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                        <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                      </g>

                      <g id="grp1" opacity="0" transform="translate(24)">
                        <circle
                          id="oval1"
                          fill="#9FC7FA"
                          cx="2.5"
                          cy="3"
                          r="2"
                        />
                        <circle
                          id="oval2"
                          fill="#9FC7FA"
                          cx="7.5"
                          cy="2"
                          r="2"
                        />
                      </g>
                    </g>
                  </svg>
                </label>
              </div>

              {/* {profile.favorites.find((el) => el.game_id === game.id) ? (
                <button className="game-list-button" onClick={addToFavorites}>
                  Add to Preferits
                </button>
              ) : (
                <button
                  className="game-list-button"
                  onClick={removeFromFavorites}
                >
                  Remove from Preferits
                </button>
              )} */}

              {/* //* GAME DETAILS ------------------------ */}
              <div className="game-description text-white shadow-dark mt-4 mt-0 ff-gotu">
                {game.description_raw}
              </div>

              {/* //* COMMENTS ---------------------------- */}
              <CarouselTest />
            </div>

            {/* //* LIVE CHAT ---------------------------- */}
            {profile && (
              <div className="col-12 col-md-6 px-0 px-lg-5 ">
                <div className="sticky-top">
                  <h2 className="shadow-neon text-center fs-1 mb-3 mt-5 mt-lg-0">
                    Live Chat
                  </h2>

                  <div className="chat-container rounded-25 text-light box-shadow-gold ">
                    <Messages profile={profile} game={game} />

                    <form
                      className="message-form mx-3 pb-3 "
                      onSubmit={handleMessageSubmit}
                    >
                      <input
                        className="chat-input me-2 rounded-pill px-2 ff-gotu"
                        type="text"
                        name="message"
                        placeholder="Type your message..."
                      />

                      <button type="submit" className="button-chat center-flex">
                        <i className="fa-solid fa-circle-chevron-right send-button fs-3" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </GameDetailLayout>
  );
}

export default GameDetail;
