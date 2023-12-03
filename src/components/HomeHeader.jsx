import '../fonts/MantiniaRegular.otf';

function HomeHeader() {
  return (
    <header className="container-fluid">
      <div className="row">
        <div className="col-12 d-flex align-items-center justify-content-center header text-center p-5 flex-column">
          <h2 className="ff-cinzel text-white text-uppercase shadow-neon fs-100">
            Aulab
          </h2>

          <h2 className="ff-cinzel text-white text-uppercase shadow-neon fs-100">
            Gamer Hub
          </h2>

          <h3 className="mt-5 ff-cinzel header-text text-white fs-1 shadow-neon">
            Select your game!
          </h3>

          <i className="fa-solid fa-angles-down my-4 mb-5 text-white neon arrow"></i>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
