import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import supabase from '../supabase/client';
import AuthContext from '../context/AuthContext';

function AppNavbar() {
  //* Questa costante è un oggetto destrutturato con le proprietà contenute all'interno di AppContext
  const { setGames } = useContext(AppContext);
  const { session } = useContext(AuthContext);
  const navigate = useNavigate();
  // const location = useLocation();
  // const [profile, setProfile] = useState(null);
  // const [loading, setLoading] = useState(true);

  // const updateUser = location.state?.updateProfile || {};

  // console.log(updateUser);

  // useEffect(() => {
  //   let ignore = false;
  //   async function getProfile() {
  //     setLoading(true);
  //     const { user } = session;

  //     const { data, error } = await supabase
  //       .from('profiles')
  //       .select('*')
  //       .eq('id', user.id)
  //       .single();

  //     if (!ignore) {
  //       if (error) {
  //         console.warn(error);
  //       } else if (data) {
  //         setProfile(data);
  //       }
  //     }

  //     setLoading(false);
  //   }

  //   getProfile();

  //   return () => {
  //     ignore = true;
  //   };
  // }, [session]);

  const gameHandler = (event) => {
    setGames(event.currentTarget.value);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    console.log('form submitted');
  };

  //* Le due funzioni che gestiscono il controllo su Admin

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
        <a className="navbar-brand mx-3 presto" href="./index.html">
          <span className="ff-cinzel text-white fs-4 fs-md-2 neon">
            Aulab Gamer Hub
          </span>
        </a>

        <button
          className="navbar-toggler mx-3"
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
            <a className="navbar-brand mx-3 presto" href="./index.html">
              <span className="ff-cinzel text-white fs-2 neon">
                Aulab Gamer Hub
              </span>
            </a>

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
                  <li className="nav-item">
                    <Link
                      className="text-decoration-none nav-link"
                      to="/profile"
                    >
                      {session.user.user_metadata.username ||
                        session.user.email}
                    </Link>
                  </li>
                  <li
                    className="nav-item text-decoration-none nav-link "
                    onClick={handleSignOut}
                  >
                    Logout
                  </li>
                </ul>
              ) : (
                <li className="nav-item">
                  <Link className="text-decoration-none nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>

            <form className="d-flex" role="search" onSubmit={searchHandler}>
              <input
                className="form-control no-shadow me-2 rounded-pill ff-cinzel text-center mt-3 mt-md-0"
                type="search"
                id="search"
                placeholder="Search"
                aria-label="Search"
                // value={games}
                onChange={gameHandler}
              />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
