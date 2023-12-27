import { useContext, useEffect, useState } from 'react';
import useProfile from '../../hooks/useProfile';
import AuthLayout from '../../layout/AuthLayout';
import getProfileImg from '../../utils/getProfileImg';
import AuthContext from '../../context/AuthContext';
import supabase from '../../supabase/client';
import Space from '../../components/Layout/Space';
import LeafDecoration from '../../components/Decorations/LeafDecoration';
import PacManLoader from '../../components/Loader/PacManLoader';
import formatMessageDate from '../../utils/formatMessageDate';

function AccountProfile() {
  const { profile, loading } = useProfile();
  const { session } = useContext(AuthContext);
  const [fav, setFav] = useState([]);
  const [comments, setComments] = useState([]);

  //* REVIEWS ----------------------------
  const getComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*, profile: profiles(*)')
      .eq('profile_id', session.user.id);
    if (error) {
      alert(error.message);
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const removeReview = async (id) => {
    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) {
      alert(error.message);
    } else {
      getComments();
    }
  };

  //* FAVORITES ------------------------
  const getFavGame = async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('profile_id', session.user.id);
    if (error) {
      alert(error.message);
    } else {
      setFav(() => [...data]);
    }
  };

  useEffect(() => {
    if (session) {
      getFavGame();
    }
  }, []);

  return (
    <AuthLayout>
      <div className="container mb-4">
        <Space />
        <div className="row">
          <div className="col-12 d-flex justify-content-center pt-5 pb-2 overflow-hidden">
            {profile && (
              <h1
                className="pb-2 text-center text-white shadow-neon fs-0 ff-cinzel page-title"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-anchor-placement="center-bottom"
              >
                Welcome, {profile.username || profile.email}!
              </h1>
            )}
          </div>
          <LeafDecoration />
        </div>
      </div>

      <div className="container">
        {loading && <PacManLoader />}

        <div className="row profile-details">
          {/*//* PROFILE DETAILS ------------------------------- */}
          <div className="col-12 col-lg-4 ps-md-4 pe-md-2 mb-3 profile-details-anim">
            <div className="info-box box-shadow-gold p-4 mb-2">
              <div className="col-12 center-flex">
                <div
                  className="avatar-box rounded-pill overflow-hidden center-flex box-shadow-gold mb-4"
                  style={{
                    backgroundImage: `url('${
                      profile && getProfileImg(profile.avatar_url)
                    }')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                />
              </div>

              <div class="col-12 custom-box text-white rounded mb-3">
                <label className="custom-text shadow-neon" htmlFor="email">
                  First Name
                </label>

                <input
                  name="email"
                  id="email"
                  type="text"
                  value={profile && profile.first_name}
                  disabled
                  className="form-field text-white"
                />
              </div>

              <div class="col-12 custom-box text-white rounded mb-3">
                <label className="custom-text shadow-neon" htmlFor="email">
                  Last Name
                </label>

                <input
                  name="email"
                  id="email"
                  type="text"
                  value={profile && profile.last_name}
                  disabled
                  className="form-field text-white"
                />
              </div>

              <div class="col-12 custom-box text-white rounded mb-3">
                <label className="custom-text shadow-neon" htmlFor="email">
                  E-mail
                </label>

                <input
                  name="email"
                  id="email"
                  type="text"
                  value={session.user.email}
                  disabled
                  className="form-field text-white"
                />
              </div>

              <div class="col-12 custom-box text-white rounded mb-3">
                <div class="custom-text shadow-neon">Last Login</div>
                <div>{formatMessageDate(session.user.last_sign_in_at)}</div>
              </div>
            </div>
          </div>

          {/*//* REVIEWS ------------------------------- */}
          <div className="col-12 col-lg-4 ps-md-4 pe-md-2 mb-4 mb-lg-0 profile-reviews">
            <div className="info-box p-3 px-2">
              <h4 className="text-center shadow-neon mb-3 mt-1">
                Your Reviews
              </h4>
              <div className="user-review-box px-3 pt-2">
                {comments.map((comment) => (
                  <div key={comment.id} className="mt-4">
                    <div className="col-12 custom-box text-white rounded">
                      <div className="d-flex justify-content-end">
                        <p className="custom-text shadow-neon">
                          {comment.game_name}
                        </p>

                        <span className="custom-icon rounded-pill center-flex ">
                          <i
                            className="fa-solid fa-xmark text-danger cursor-pointer"
                            onClick={() => removeReview(comment.id)}
                          />
                        </span>
                      </div>
                      <div>
                        <p className="ff-gotu text-center">
                          {comment.review_content}
                        </p>
                        <div className="d-flex justify-content-end">
                          <p className="fs-7 m-0">
                            {formatMessageDate(comment.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/*//* FAVORITES ----------------------------- */}
          <div className="col-12 col-lg-4 ps-md-3 pe-md-4 mb-3 profile-fav">
            <div className="info-box p-3 px-2">
              <h4 className="text-center shadow-neon mb-3 mt-1">
                Your Favorites
              </h4>
              <div className="user-review-box px-3">
                {fav &&
                  fav.map((favGame) => (
                    <div className="mt-3" key={favGame.id}>
                      <div className="col-12 custom-box text-white rounded">
                        <div className="d-flex justify-content-end">
                          {/* <p className="custom-text shadow-neon">Fav Game</p> */}
                        </div>
                        <div className="py-2">
                          <p className="ff-gotu text-center m-0">
                            {favGame.game_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default AccountProfile;
