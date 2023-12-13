import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import supabase from '../supabase/client';
import AuthContext from '../context/AuthContext';
import useProfile from '../hooks/useProfile';
import getProfileImg from '../utils/getProfileImg';

function AppNavbar() {
  //* Questa costante è un oggetto destrutturato con le proprietà contenute all'interno di AppContext
  const { setGames } = useContext(AppContext);
  const { session } = useContext(AuthContext);
  const { profile } = useProfile();
  const navigate = useNavigate();

  const gameHandler = (event) => {
    setGames(event.currentTarget.value);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    console.log('form submitted');
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top navbar-dark nav nav-scrolled mx-3"
      aria-label="Offcanvas navbar large"
    >
      <div className="container nav-container rounded-pill" id="nav-container">
        <Link className="navbar-brand mx-3 presto" to="/">
          <span className="ff-cinzel text-white fs-5 fs-md-2 shadow-neon">
            Aulab Gamer Hub
          </span>
        </Link>

        <button
          className="navbar-toggler me-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbar"
          aria-controls="navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="navbar"
          aria-labelledby="navbarLabel"
        >
          <div className="offcanvas-header">
            <Link className="navbar-brand mx-3 presto" to="/">
              <span className="ff-cinzel text-white fs-2 neon">
                Aulab Gamer Hub
              </span>
            </Link>

            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body menu justify-content-center">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="text-decoration-none nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="text-decoration-none nav-link" to="/games">
                  Game List
                </Link>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://www.gamesintime.altervista.org/giochi-del-mese"
                  target="_blank"
                  rel="noreferrer"
                >
                  GamesInTime
                </a>
              </li>

              {session ? (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      className="text-decoration-none nav-link"
                      to="/settings"
                    >
                      Settings
                    </Link>
                  </li>
                  <li
                    className="nav-item text-decoration-none nav-link cursor-pointer"
                    onClick={handleSignOut}
                  >
                    Logout
                  </li>
                  <li className="nav-item">
                    <Link
                      className="text-decoration-none nav-link"
                      to="/profile"
                    >
                      {(profile && profile.username) || session.user.email}
                    </Link>
                  </li>

                  <div className="nav-item avatar-nav-box rounded-pill overflow-hidden center-flex ms-1">
                    <Link
                      className="text-decoration-none nav-link"
                      to="/profile"
                    >
                      <img
                        src={profile && getProfileImg(profile.avatar_url)}
                        alt="profile"
                        className="img-avatar-nav"
                      />
                    </Link>
                  </div>
                </ul>
              ) : (
                <li className="nav-item">
                  <Link className="text-decoration-none nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
