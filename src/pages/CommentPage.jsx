import supabase from '../supabase/client';
import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import Space from '../components/Space';
import LeafDecoration from '../components/Decorations/LeafDecoration';

function CommentPage() {
  const navigate = useNavigate();
  const game = useLoaderData();
  const [success, setSuccess] = useState(false);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const commentForm = event.currentTarget;
    const { content } = Object.fromEntries(new FormData(commentForm));
    if (typeof content === 'string' && content.trim().length !== 0) {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            // profile_id: session.user.id,
            game_id: game.id,
            game_name: game.name,
            review_content: content,
          },
        ])
        .select();
      if (error) {
        alert(error.message);
      } else {
        commentForm.reset();
        setSuccess(true);
        navigate(`/game/${game.slug}`);
      }
    }
  };

  return (
    <AuthLayout>
      <div className="auth-page container px-3">
        <Space />
        <div className="row my-md-5 my-4">
          <div className="col-12 d-flex justify-content-center">
            <h1
              className="pb-2 text-center text-white shadow-neon fs-0 ff-cinzel"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor-placement="center-bottom"
            >
              Write a Review
            </h1>
          </div>
          <LeafDecoration />
        </div>

        <div className="row center-flex">
          <div className="col-12 text-center">
            <h3 className=" ff-cinzel text-white fs-1 shadow-neon">
              {game.name}
            </h3>
          </div>

          <div className="col-12 col-lg-8 center-flex">
            <form
              onSubmit={handleCommentSubmit}
              className="review-comment-form center-flex"
            >
              <textarea
                className="mt-3 review-comment focus-shadow border-0 p-3 text-center text-light ff-gotu"
                type="text"
                id="content"
                name="content"
                placeholder="Write a comment"
              />

              <button type="submit" className="game-list-button mt-3">
                {success ? 'Review sent ✅' : 'Publish'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default CommentPage;
