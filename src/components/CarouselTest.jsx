import { useContext, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import useProfile from '../hooks/useProfile';
import supabase from '../supabase/client';
import formatMessageDate from '../utils/formatMessageDate';
import getProfileImg from '../utils/getProfileImg';
import { useSnapCarousel } from 'react-snap-carousel';

const CarouselTest = () => {
  const [comments, setComments] = useState([]);
  const { game } = useContext(AppContext);
  const { profile } = useProfile();

  useEffect(() => {
    const getComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*, profile: profiles(*)')
        .eq('game_slug', game.slug);
      if (error) {
        alert(error.message);
      } else {
        setComments(data);
      }
    };
    getComments();
  }, []);

  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();

  return (
    <div className="col-12 col-lg-6 mt-5">
      <h2 className="shadow-neon text-center fs-1 mb-3">User Reviews</h2>
      <div className="col-12 center-flex overflow-hidden">
        <ul
          className="review-container d-flex overflow-auto"
          ref={scrollRef}
          style={{
            scrollSnapType: 'x mandatory',
          }}
        >
          {comments &&
            comments.map((comment) => (
              <li key={comment.id}>
                <figure class="snip1390 mx-5 mt-2 center-flex">
                  <div className="avatar-review-box rounded-pill overflow-hidden center-flex ms-2">
                    <img
                      src={profile && getProfileImg(comment.profile.avatar_url)}
                      alt="profile"
                      className="img-avatar-review"
                    />
                  </div>
                  <figcaption>
                    <h4 className="text-white mt-3">
                      {comment.profile.username}
                    </h4>
                    <p className="text-white fs-6 mb-4">
                      {formatMessageDate(comment.created_at)}
                    </p>
                    <div className="blockquote text-light fs-6 rounded box-shadow-neon py-3 px-2 m-0 box-shadow-gold">
                      <p>" {comment.review_content} "</p>
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
        </ul>
        <div className="d-flex align-items-center mb-3">
          <i
            className={`fa-solid fa-chevron-left fs-1 cursor-pointer text-light pagination-down neon`}
            onClick={() => prev()}
          />
          <div className="text-white shadow-neon mx-4 fs-5">
            {activePageIndex + 1} / {pages.length}
          </div>
          <i
            className="fa-solid fa-chevron-right pagination-up fs-1 text-light neon cursor-pointer"
            onClick={() => next()}
          />
        </div>
      </div>
      <div className="col-12 center-flex">
        <Link to={`/game/${game.slug}/review`}>
          <button type="button" className="game-list-button">
            Write review
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarouselTest;
