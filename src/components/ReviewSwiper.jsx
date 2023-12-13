import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import supabase from '../supabase/client';
import useProfile from '../hooks/useProfile';
import formatMessageDate from '../utils/formatMessageDate';
import getProfileImg from '../utils/getProfileImg';

export default function ReviewSwiper({ game }) {
  const [ comments, setComments ] = useState([]);
  const { profile } = useProfile();

  const getComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*, profile: profiles(*)')
      .eq('game_id', game.id);
    if (error) {
      alert(error.message);
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <div className="mt-5">
        <h2 className="shadow-neon text-center fs-1 ">User Reviews</h2>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {comments.length !== 0 ? (
            comments.map((comment) => (
              <SwiperSlide key={comment.id}>
                <div class="snip1390 center-flex">
                  <div className="avatar-review-box rounded-pill overflow-hidden center-flex ms-2">
                    <img
                      src={getProfileImg(comment.profile.avatar_url)}
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
                </div>
              </SwiperSlide>
            ))
          ) : (
            <h3 className="text-center text-light">No reviews yet!</h3>
          )}
        </Swiper>
        <div className="col-12 center-flex">
          <Link to={profile ? `/game/${game.id}/review` : '/login'}>
            <button type="button" className="game-list-button">
              Write review
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
