function HomeHeader() {
  return (
    <header className="container-fluid">
      <div className="row">
        <div className="col-12 d-flex align-items-center justify-content-center header text-center p-5 flex-column">
          <h2 className="ff-orbitron text-white text-uppercase glitch">
            Press
          </h2>

          <h2 className="ff-orbitron text-white text-uppercase glitch glitch-start">
            start!
          </h2>

          <h3 className="mt-5 ff-orbitron header-text text-white shadow-pink">
            Trova il tuo videogioco!
          </h3>

          <i className="fa-solid fa-angles-down my-4 mb-5 text-white neon arrow"></i>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
