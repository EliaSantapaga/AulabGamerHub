import { useContext, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import useProfile from '../hooks/useProfile';
import supabase from '../supabase/client';
import formatMessageDate from '../utils/formatMessageDate';
import getProfileImg from '../utils/getProfileImg';

function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const { game } = useContext(AppContext);
  const { profile } = useProfile();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

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

  return (
    <div className="col-12 col-lg-6">
      <h2 className="shadow-neon text-center fs-1 mb-3">User Reviews</h2>
      <div className="col-12 center-flex">
        <Carousel
          className="review-carousel"
          activeIndex={index}
          onSelect={handleSelect}
        >
          {comments &&
            comments.map((comment) => (
              <Carousel.Item key={comment.id}>
                <figure class="snip1390 mx-5 center-flex">
                  <div className="avatar-chat-box rounded-pill overflow-hidden center-flex ms-2">
                    <img
                      src={profile && getProfileImg(profile.avatar_url)}
                      alt="profile"
                      className="img-avatar-chat"
                    />
                  </div>
                  <figcaption>
                    <h4 className="text-white mt-2">
                      {comment.profile.username}
                    </h4>
                    <p className="text-white fs-6 mt-2">
                      {formatMessageDate(comment.created_at)}
                    </p>
                    <blockquote>{comment.review_content}</blockquote>
                  </figcaption>
                </figure>
              </Carousel.Item>
            ))}
        </Carousel>
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
}

export default ReviewCarousel;
