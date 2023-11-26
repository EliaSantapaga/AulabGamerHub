import { useContext } from "react";
import {
  Link,
  // useNavigate
} from "react-router-dom";
import AppContext from "../context/AppContext";

function AppNavbar() {
  //* Questa costante è un oggetto destrutturato con le proprietà contenute all'interno di AppContext
  const {
    // admin,
    // setAdmin,
    setGames,
  } = useContext(AppContext);
  // const navigate = useNavigate();

  const gameHandler = (event) => {
    setGames(event.currentTarget.value);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    console.log("form submitted");
  };

  //* Le due funzioni che gestiscono il controllo su Admin
  // const handleSignIn = () => {
  //   setAdmin(true);
  //   navigate("/admin");
  // };

  // const handleSignOut = () => {
  //   setAdmin(false);
  //   navigate("/");
  // };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top navbar-dark nav nav-scrolled mx-3"
      aria-label="Offcanvas navbar large"
    >
      <div className="container nav-container rounded-pill" id="nav-container">
        <a className="navbar-brand mx-3 presto" href="./index.html">
          <span className="text-uppercase text-white fs-1 fst-italic fw-bold ff-orbitron">
            Pre<i className="fas fa-bolt fs-1 text-white logo neon-logo"></i>to
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
              <span className="text-uppercase text-white fs-1 fst-italic fw-bold ff-orbitron neon">
                Pre
                <i className="fa-solid fa-bolt fs-1 text-white logo neon"></i>to
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
                <Link className="text-decoration-none" to="/">
                  <a className="nav-link" aria-current="page" href="">
                    Home
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="text-decoration-none" to="/games">
                  <a className="nav-link" href="">
                    Game List
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://www.gamesintime.altervista.org/giochi-del-mese"
                  target="_blank"
                  rel="noreferrer"
                >
                  Giochi del Mese
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

              <li className="nav-item">
                <Link className="text-decoration-none" to="/login">
                  <a className="nav-link" href="">
                    Login
                  </a>
                </Link>
              </li>
            </ul>

            <form className="d-flex" role="search" onSubmit={searchHandler}>
              <input
                className="form-control me-2 rounded-pill"
                type="search"
                id="search"
                placeholder="Search"
                aria-label="Search"
                // value={games}
                onChange={gameHandler}
              />
              {/* <button
                className="btn btn-outline-success rounded-pill"
                type="submit"
              >
                Search
              </button> */}
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
