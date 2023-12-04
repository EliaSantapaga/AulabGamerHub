import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameDetailLayout from '../layout/GameDetailLayout';
import Space from '../components/Space';
import Messages from '../components/LiveChat/Messages';
import supabase from '../supabase/client';
import LeafDecoration from '../components/Decorations/LeafDecoration';
import useProfile from '../hooks/useProfile';
import '../components/LiveChat/Messages.css';

function GameDetail() {
  const { profile } = useProfile();
  const [game, setGame] = useState([]);

  //* Il params presente qui sopra è possibile destrutturarlo con ciò che ci serve, ovvero il game_slug
  const { game_slug } = useParams();

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
        console.log(data);
      }
    }
  };

  console.log(profile);

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

          {/* //* GAME DETAILS ------------------------ */}
          <div className="row my-5 m-0">
            <div className="col-12 col-md-6">
              <img className="img-article" src={game.background_image} alt="" />
            </div>
            <div className="game-description col-12 col-md-6 text-white shadow-dark mt-4 mt-md-0 ff-gotu">
              {game.description_raw}
            </div>
          </div>

          {/* //* LIVE CHAT ---------------------------- */}
          <div className="row m-0 center-flex">
            <div className="col-12 col-md-6">
              <h2 className="shadow-neon text-center fs-1 mb-3">Live Chat</h2>

              <div className="chat-container text-light box-shadow-gold">
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
        </div>
      </div>
    </GameDetailLayout>
  );
}

export default GameDetail;
