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
// import FavouriteButton from '../../components/FavouriteButton';
// import AppContext from '../../context/AppContext';
// import { Link } from '@mui/material';

function AccountProfile() {
  const { profile, loading } = useProfile();
  const { session } = useContext(AuthContext);
  // const { game } = useContext(AppContext);

  const [fav, setFav] = useState([]);
  const [comments, setComments] = useState([]);
  // const [hovered, setHovered] = useState(false);

  //* REVIEWS ----------------------------
  const getComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*, profile: profiles(*)');
    // .eq('game_id', game.id);
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

  console.log(session);
  console.log(profile);
  console.log(fav);

  return (
    <AppLayout>
      <div className="container px-3">
        <Space />
        <div className="row my-md-5 my-4">
          <div className="col-12 d-flex justify-content-center">
            {profile && (
              <h1
                className="pb-2 text-center text-white shadow-neon fs-0 ff-cinzel"
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

        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 p-3 p-md-0">
            <div className="info-box box-shadow-gold p-4 mb-2 mb-md-5">
              {/*//* PROFILE PIC ----------------------------------- */}
              <div className="col-12 center-flex">
                <div className="avatar-box rounded-pill overflow-hidden center-flex box-shadow-gold mb-4">
                  <img
                    src={profile && getProfileImg(profile.avatar_url)}
                    alt="profile"
                    className="img-avatar"
                  />
                </div>
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

          {/*//* REVIEWS AND FAVORITES ---------------------- */}
          <div className="col-12 col-md-6 col-lg-8">
            <div className="row">
              <div className="col-12 col-lg-6 ps-md-4 pe-md-2 mb-3">
                <div className="info-box p-3">
                  <h4 className="text-center shadow-neon mb-3">
                    Le tue Reviews
                  </h4>
                  {comments.map((comment) => (
                    <div key={comment.id}>
                      <p>{comment.review_content}</p>
                      <div>
                        <p>{formatMessageDate(comment.created_at)}</p>
                      </div>

                      <button onClick={removeReview(comment.id)}>Remove</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12 col-lg-6 ps-md-4 pe-md-2 mb-5">
                <div className="info-box p-3">
                  <h4 className="text-center shadow-neon mb-3">
                    I tuoi Preferiti
                  </h4>
                  {fav &&
                    fav.map((favGame) => (
                      <div
                        className="fav-games-list border-top d-flex align-items-center justify-content-center"
                        key={favGame.id}
                      >
                        {/* <Link to="/game/:game_id"> */}
                        <p className="mt-3">{favGame.game_name}</p>
                        {/* </Link> */}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default AccountProfile;
