import { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import GameDetailLayout from '../layout/GameDetailLayout';
import Space from '../components/Space';
import Messages from '../components/LiveChat/Messages';
import supabase from '../supabase/client';
import LeafDecoration from '../components/Decorations/LeafDecoration';
import useProfile from '../hooks/useProfile';
import AppContext from '../context/AppContext';
import FavouriteButton from '../components/FavouriteButton';
import ReviewSwiper from '../components/ReviewSwiper';

export async function getSingleGame({ params }) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}games/${params.id}?key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const json = await response.json();
  return json;
}

function GameDetail() {
  const { profile } = useProfile();
  const game = useLoaderData();

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
            game_id: game.id,
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

  return (
    <GameDetailLayout>
      <div className="container">
        <Space />
        <div className="row">
          <div className="col-12 d-flex justify-content-center pt-5 pb-2 overflow-hidden">
            <h1
              className="pb-2 text-center text-white shadow-neon fs-0 ff-cinzel page-title"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor-placement="center-bottom"
            >
              {game.name}
            </h1>
          </div>
          <LeafDecoration />
        </div>

        <div className="row my-5 m-0">
          <div className="col-12 col-md-6">
            <h2 className="shadow-neon text-center fs-1 mb-3 mt-md-55 mt-lg-0">
              Game Details
            </h2>

            {/*//* FAVOURITES BUTTON ----------------- */}
            <div className="fav-container p-2">
              <FavouriteButton game={game} />
            </div>

            <img
              className="img-article rounded"
              src={game.background_image}
              alt=""
            />

            {/* //* GAME DETAILS ------------------------ */}
            <div className="game-description text-white shadow-dark mt-4 mt-0 ff-gotu">
              {game.description_raw}
            </div>

            {/* //* COMMENTS ---------------------------- */}
            <ReviewSwiper game={game} />
          </div>

          {/* //* LIVE CHAT ---------------------------- */}
          {profile ? (
            <div className="col-12 col-md-6 px-0 px-lg-5">
              <div className="sticky-top">
                <h2 className="shadow-neon text-center fs-1 mb-3">Live Chat</h2>

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
          ) : (
            <div className="col-12 col-md-6 px-lg-5">
              <div className="sticky-top">
                <h2 className="shadow-neon text-center fs-1 mb-3">Live Chat</h2>

                <div className="chat-container-no-user rounded-25 text-light box-shadow-gold">
                  <div className="chat-msg-no-user center-flex">
                    <h3 className="text-center shadow-neon">
                      Login to interact <br /> with the Live Chat
                    </h3>
                  </div>
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

                    <Link to="/login" className="text-decoration-none">
                      <button className="button-chat center-flex">
                        <i className="fa-solid fa-circle-chevron-right fs-3" />
                      </button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </GameDetailLayout>
  );
}

export default GameDetail;
