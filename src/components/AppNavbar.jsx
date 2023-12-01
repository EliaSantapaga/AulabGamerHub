import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import supabase from "../supabase/client";
import AuthContext from "../context/AuthContext";

function AppNavbar() {
  //* Questa costante è un oggetto destrutturato con le proprietà contenute all'interno di AppContext
  const {
    // admin,
    // setAdmin,
    setGames,
  } = useContext(AppContext);
  const { session } = useContext(AuthContext);
  const navigate = useNavigate();

  const gameHandler = (event) => {
    setGames(event.currentTarget.value);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    console.log("form submitted");
  };

  //* Le due funzioni che gestiscono il controllo su Admin

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
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

              {/* <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://www.gamesintime.altervista.org/chi-siamo"
                  target="_blank"
                  rel="noreferrer"
                >
                  Chi siamo
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://www.gamesintime.altervista.org/contatti"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contatti
                </a>
              </li> */}

              {session ? (
                <ul className="navbar-nav">
                  <li
                    className="nav-item text-decoration-none nav-link"
                    onClick={handleSignOut}
                  >
                    Logout
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

            {/*
          //* Una volta importato come prop setAdmin, posso fare un controllo su admin per capire se è true o false e cambiarlo di conseguenza per eseguire il login o il logout.

          //* Per entrambi i casi viene chiamata la funzione setAdmin per cambiare a true una volta eseguito il login e a false quando si slogga.
          */}

            {/* //* {se non-admin (!admin) è true (?) allora mostra login, altrimenti (:) mostra logout}  */}
            {/* {!admin ? (
              <button
                onClick={handleSignIn}
                className="btn btn-outline-warning rounded-pill mx-3"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleSignOut}
                className="btn btn-outline-danger rounded-pill mx-3"
              >
                Logout
              </button>
            )} */}
          </div>
        </div>
      </div>
    </nav>

    // * Una volta importato come prop setAdmin, posso fare un controllo su admin per capire se è true o false e cambiarlo di conseguenza per eseguire il login o il logout.

    // * Per entrambi i casi viene chiamata la funzione setAdmin per cambiare a true una volta eseguito il login e a false quando si slogga.

    //       {/* //* {se non-admin (!admin) è true (?) allora mostra login, altrimenti (:) mostra logout}  */}
    //       {!admin ? (
    //         <button
    //           onClick={handleSignIn}
    //           className="btn btn-outline-warning mx-3"
    //         >
    //           Login
    //         </button>
    //       ) : (
    //         <button
    //           onClick={handleSignOut}
    //           className="btn btn-outline-danger mx-3"
    //         >
    //           Logout
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  );
}

export default AppNavbar;
