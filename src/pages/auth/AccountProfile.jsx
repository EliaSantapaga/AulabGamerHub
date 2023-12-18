import { useContext, useEffect, useState } from 'react';
import useProfile from '../../hooks/useProfile';
import AppLayout from '../../layout/AppLayout';
import getProfileImg from '../../utils/getProfileImg';
import AuthContext from '../../context/AuthContext';
import supabase from '../../supabase/client';
import Space from '../../components/Space';
import LeafDecoration from '../../components/Decorations/LeafDecoration';
import PacManLoader from '../../components/Loader/PacManLoader';
import formatMessageDate from '../../utils/formatMessageDate';
import { Link } from 'react-router-dom';

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
    <AppLayout>
      <div className="container">
        <Space />
        <div className="row mb-5">
          <div className="col-12 d-flex justify-content-center pt-5 pb-2 overflow-hidden">
            {profile && (
              <h1
                className="pb-2 text-center text-white shadow-neon fs-0 ff-cinzel page-title"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-anchor-placement="center-bottom"
              >
                Welcome, {profile.username}!
              </h1>
            )}
          </div>
          <LeafDecoration />
        </div>
      </div>

      <div className="container">
        {loading && <PacManLoader />}

        <div className="row fade-in-up">
          {/*//* PROFILE DETAILS ------------------------------- */}
          <div className="col-12 col-lg-4 ps-md-4 pe-md-2 mb-5">
            <div className="info-box box-shadow-gold p-4 mb-2 mb-md-5">
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
                {/* <img
                    src={profile && getProfileImg(profile.avatar_url)}
                    alt="profile"
                    className="img-avatar"
                  /> */}
                {/* </div> */}
              </div>

              <div className="row mt-3 border-bottom">
                <div className="col-5 mb-0 d-flex align-items-end">
                  <p className="fs-6 mb-0">First Name:</p>
                </div>
                <div className="col-7 text-center mb-0 d-flex justify-content-end">
                  {profile && <p className="mb-0">{profile.first_name}</p>}
                </div>
              </div>

              <div className="row mt-3 border-bottom">
                <div className="col-5 mb-0 d-flex align-items-end">
                  <p className="fs-6 mb-0">Last Name:</p>
                </div>
                <div className="col-7 text-center mb-0 d-flex justify-content-end">
                  <p className="mb-0">
                    {profile && <p className="mb-0">{profile.last_name}</p>}
                  </p>
                </div>
              </div>

              <div className="row mt-3 border-bottom">
                <div className="col-5 mb-0 d-flex align-items-end">
                  <p className="fs-6 mb-0">E-mail:</p>
                </div>
                <div className="col-7 text-center mb-0 d-flex justify-content-end">
                  <p className="mb-0">{session.user.email}</p>
                </div>
              </div>

              <div className="row mt-3 border-bottom">
                <div className="col-5 mb-0 d-flex align-items-end">
                  <p className="fs-6 mb-0">Last Login:</p>
                </div>
                <div className="col-7 text-center mb-0 d-flex justify-content-end">
                  <p className="mb-0">
                    {formatMessageDate(session.user.last_sign_in_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*//* REVIEWS ------------------------------- */}
          <div className="col-12 col-lg-4 ps-md-4 pe-md-2 mb-5">
            <div className="info-box p-3 px-2">
              <h4 className="text-center shadow-neon mb-3 mt-1">
                Your Reviews
              </h4>
              <div className="user-review-box  px-4">
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <div className="row px-2 border-top pt-3">
                      <h6 className="text-center mb-2">{comment.game_name}</h6>
                      <div className="col-11">
                        <p className="ff-gotu">{comment.review_content}</p>
                      </div>

                      <div className="col-1">
                        <i
                          className="fa-solid fa-xmark text-danger cursor-pointer"
                          onClick={() => removeReview(comment.id)}
                        ></i>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <p className="fs-7">
                        {formatMessageDate(comment.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/*//* FAVORITES ----------------------------- */}
          <div className="col-12 col-lg-4 ps-md-3 pe-md-4 mb-5">
            <div className="info-box p-3 px-2">
              <h4 className="text-center shadow-neon mb-3 mt-1">
                Your Favorites
              </h4>
              <div className="user-review-box  px-3">
                {fav &&
                  fav.map((favGame) => (
                    <div
                      className="border-top d-flex align-items-center justify-content-center my-1"
                      key={favGame.id}
                    >
                      {/* <Link to=`/game/:${favGame.game_slug}`> */}
                      <p className="my-3 text-center">{favGame.game_name}</p>
                      {/* </Link> */}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default AccountProfile;
